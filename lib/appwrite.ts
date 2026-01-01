import { Client, Account, Databases, ID, Query } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "placeholder");

export const account = new Account(client);
export const databases = new Databases(client);

// Constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const NEWSLETTER_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_NEWSLETTER_COLLECTION_ID || "";
export const COMMENTS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID || "";

// Newsletter Functions
export const newsletterService = {
  subscribe: async (email: string, name?: string) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        NEWSLETTER_COLLECTION_ID,
        ID.unique(),
        {
          email,
          name: name || "",
          subscribedAt: new Date().toISOString(),
        }
      );
      return { success: true, data: response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  checkIfSubscribed: async (email: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        NEWSLETTER_COLLECTION_ID,
        [Query.equal("email", email)]
      );
      return response.documents.length > 0;
    } catch (error) {
      return false;
    }
  },
};

// Auth Functions
export const authService = {
  createAccount: async (email: string, password: string, name: string) => {
    try {
      const response = await account.create(ID.unique(), email, password, name);
      await authService.login(email, password);
      return { success: true, data: response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return { success: true, data: response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await account.get();
      return { success: true, data: user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  isAdmin: async () => {
    try {
      const user = await account.get();
      // Check if user has admin label (you'll set this in Appwrite Console)
      return user.labels?.includes("admin") || false;
    } catch (error) {
      return false;
    }
  },
};

// Comments Functions
export const commentsService = {
  create: async (
    postSlug: string,
    content: string,
    userId: string,
    userName: string
  ) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COMMENTS_COLLECTION_ID,
        ID.unique(),
        {
          postSlug,
          content,
          userId,
          userName,
          createdAt: new Date().toISOString(),
        }
      );
      return { success: true, data: response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  getByPost: async (postSlug: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COMMENTS_COLLECTION_ID,
        [Query.equal("postSlug", postSlug), Query.orderDesc("createdAt")]
      );
      return { success: true, data: response.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  delete: async (commentId: string) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COMMENTS_COLLECTION_ID,
        commentId
      );
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};

export { ID, Query };
export default client;
