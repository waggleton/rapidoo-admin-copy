

import { writeFile } from 'fs/promises'
import {NextRequest, NextResponse} from 'next/server'
import { join } from 'path'
import { SetProfileImage } from './SetProfileImage';

const ADMIN_BASE_URL = 'http://127.0.0.1:8000/v1/admin/';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null =  data.get('file') as unknown as File;
    const userID = data.get('id') as string;
    const fileExtension = file.name.split('.').pop();

    if (!fileExtension) {
        return NextResponse.json({ success: false, message: 'File does not have a valid extension' }, { status: 400 });
    }

    // Use userID with the file extension
    const fileName = `${userID}.${fileExtension}`;

    if (!file) {
        return NextResponse.json({ success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(`public\\images\\profile_images`, fileName);
    await writeFile(path, buffer);

    console.log(`saved to ${path}`);

    SetProfileImage(path, userID);

    return NextResponse.json({ success: true })
}