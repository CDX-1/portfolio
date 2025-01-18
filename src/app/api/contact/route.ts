import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!process.env.DISCORD_WEBHOOK_URL) {
            throw new Error("DISCORD_WEBHOOK_URL is not defined");
        }

        const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [
                    {
                        author: {
                            name: data.email
                        },
                        description: data.message
                    }
                ] 
            })
        });

        if (!res.ok) {
            throw new Error("Failed to send message to Discord");
        }

        return NextResponse.json({ message: "Message received" });
    } catch (err) {
        return NextResponse.json({ message: "Failed to parse request" }, { status: 400 });
    }
}