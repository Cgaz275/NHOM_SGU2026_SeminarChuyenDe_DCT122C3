const { db } = require("./config/firebase");

async function setAdmin() {
  const email = "admin@gmail.com";
  console.log("Đang tìm user với email:", email);
  
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) {
    console.log("Không tìm thấy user nào với email:", email);
    console.log("Vui lòng đảm bảo bạn đã đăng ký tài khoản này trên giao diện web trước!");
    process.exit(0);
  }

  for (const doc of snapshot.docs) {
    await usersRef.doc(doc.id).update({ role: "admin" });
    console.log(`Thành công! User ${email} (ID: ${doc.id}) đã được cấp quyền admin.`);
  }
  
  process.exit(0);
}

setAdmin().catch(err => {
  console.error("Lỗi:", err);
  process.exit(1);
});
