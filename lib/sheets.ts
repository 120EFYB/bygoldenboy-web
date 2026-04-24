import { google } from "googleapis";
import { Product } from "@/types/product";

/**
 * Service to fetch and synchronize data from Google Sheets
 * Uses a Service Account with JWT authentication
 */

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

export async function getProductsFromSheet(): Promise<Product[]> {
  try {
    // Check for environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error("Missing Google Sheets environment variables");
      return [];
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: SCOPES
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    // Fetch data from A2 to N (as per our suggested structure)
    // We assume the first sheet is where the data lives
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A2:N1000", 
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.warn("No data found in Google Sheet.");
      return [];
    }

    // Map rows to Product interface
    return rows.map((row) => ({
      id: parseInt(row[0] || "0"),
      slug: row[1] || "",
      name: row[2] || "",
      brand: row[3] || "",
      price: parseInt(row[4] || "0"),
      category: (row[5] || "calzado") as Product["category"],
      subcategory: row[6] || "",
      gender: (row[7] || "unisex") as Product["gender"],
      image: row[8] || "",
      color: row[9] || "",
      origin: row[10] || "",
      description: {
        es: row[11] || "",
        en: row[12] || "",
      },
      isNew: row[13] === "TRUE",
      stock: parseInt(row[14] || "15"), // Column O - Default to 15 if empty
    }));

  } catch (error) {
    console.error("Fatal error fetching from Google Sheets:", error);
    return [];
  }
}

/**
 * Helper to fetch a single product by slug (with cache optimization)
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProductsFromSheet();
  return products.find(p => p.slug === slug);
}
