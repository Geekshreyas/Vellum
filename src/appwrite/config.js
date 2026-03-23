import conf from "/src/conf/conf.js";
import { ID, Client, Databases, Storage, Query } from "/node_modules/.vite/deps/appwrite.js?v=cbf37a0c";

export class Service { 
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredimage: featuredImage,
                    status,                      
                    userid: userId,              
                }
            );
        } catch(error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error; 
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredImage, 
                    status,
                }
            );
        } catch(error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch(error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){ 
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            
            
            if (document) {
                if (document.featuredimage) {
                    document.featuredImage = document.featuredimage;
                }
                if (document.userid) {
                    document.userId = document.userid;
                }
            }
            return document;
        } catch(error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", 'active')]){
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            
            
            if (result && result.documents) {
                result.documents = result.documents.map((doc) => {
                    if (doc.featuredimage) {
                        doc.featuredImage = doc.featuredimage;
                    }
                    if (doc.userid) {
                        doc.userId = doc.userid;
                    }
                    return doc;
                });
            }
            return result;
        } catch(error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) { 
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        ).href; 
    }
}

const appwriteService = new Service(); 
export default appwriteService;