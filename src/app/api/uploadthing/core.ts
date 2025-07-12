import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const handleAuth = async () => {
  const userId = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  return { userId };
};

export const ourFileRouter = {  
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {
      console.log('Server Image Upload Completed.');
    }),
  messageFile: f(['image', 'pdf'])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {
      console.log('Message File Upload Completed.');
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
