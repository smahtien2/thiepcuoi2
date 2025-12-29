export async function onRequestPost({ request, env }) {
    try {
        const {
            full_name,
            number_of_guests,
            attending,
            message
        } = await request.json();

        await env.DB.prepare(
            `
            INSERT INTO rsvp_guests 
            (full_name, number_of_guests, attending, message)
            VALUES (?, ?, ?, ?)
            `
        )
        .bind(
            full_name,
            number_of_guests,
            attending,
            message
        )
        .run();

        return new Response(
            JSON.stringify({
                message: "🎉 Đã ghi nhận xác nhận của bạn!"
            }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({
                message: "❌ Lỗi server",
                error: err.message
            }),
            { status: 500 }
        );
    }
}