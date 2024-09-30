// src/app/api/expense/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://phanuwatsa:qhmC2yJWT3OjcMyz@phanuwat.kqdaq.mongodb.net/'; // แทนที่ด้วย URL ของ MongoDB
const client = new MongoClient(uri);

export async function POST(request: Request) {
    const body = await request.json();
    
    const { amount, date, type, note } = body;

    try {
        await client.connect();
        const database = client.db('total'); // แทนที่ด้วยชื่อฐานข้อมูลของคุณ
        const collection = database.collection('total_price'); // แทนที่ด้วยชื่อคอลเลคชันของคุณ

        const newExpense = { amount, date, type, note };
        await collection.insertOne(newExpense);

        return NextResponse.json({ message: 'บันทึกสำเร็จ' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการบันทึก' }, { status: 500 });
    } finally {
        await client.close();
    }
}