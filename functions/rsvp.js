export async function onRequestGet({ env }) {
    try {
        // Thử đọc số bản ghi trong bảng rsvp_guests
        const result = await env.DB.prepare("SELECT COUNT(*) AS total FROM rsvp_guests").all();
        
        return new Response(JSON.stringify({
            message: "Kết nối thành công!",
            total_records: result.results[0].total
        }), { headers: { "Content-Type": "application/json" } });
    } catch (err) {
        return new Response(JSON.stringify({
            message: "❌ Lỗi kết nối DB",
            error: err.message
        }), { headers: { "Content-Type": "application/json" } });
    }
}
