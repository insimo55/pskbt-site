import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const runtime = 'nodejs';

// Принудительно указываем, что это динамический роут (избегает кэширования)
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    console.log("1. Начало обработки запроса");
    
    // Получаем FormData
    const formData = await req.formData();
    console.log("2. FormData получена");

    // Извлекаем поля
    const formType = formData.get("formType") as string;
    const name = formData.get("name") as string || "Не указано";
    const phone = formData.get("phone") as string || "-";
    const email = formData.get("email") as string || "-";
    const company = formData.get("company") as string || "-";
    const message = formData.get("message") as string || "-";
    const position = formData.get("position") as string || "-";
    
    // Получаем файл как Blob (это безопаснее, чем File в Node.js)
    const fileEntry = formData.get("resume");

    // Настраиваем почтовик
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("MAIL_TO:", process.env.MAIL_TO);
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Формируем текст письма
    let subject = "Новая заявка с сайта";
    let htmlContent = "";

    if (formType === "client") {
      subject = `🤝 Клиент: ${company}`;
      htmlContent = `
        <div style="font-family: sans-serif;">
          <h2>Новое обращение клиента</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Компания:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <hr/>
          <p><strong>Сообщение:</strong><br/>${message}</p>
        </div>
      `;
    } else if (formType === "candidate") {
      subject = `👷 Резюме: ${position}`;
      htmlContent = `
        <div style="font-family: sans-serif;">
          <h2>Отклик на вакансию</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Должность:</strong> ${position}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
        </div>
      `;
    } else if (formType === "sample") {
        subject = `🧪 Запрос образца: ${formData.get("product")}`;
        htmlContent = `
            <div style="font-family: sans-serif;">
            <h2>Запрос образца продукции</h2>
            <p><strong>Продукт:</strong> ${formData.get("product")}</p>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Компания:</strong> ${company}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <hr/>
            <p><strong>Сообщение:</strong><br/>${message}</p>
            </div>
        `;
    } else if (formType === "Tech") {
        subject = `🫗 Запрос консультации по системе: ${formData.get("product")}`;
        htmlContent = `
            <div style="font-family: sans-serif;">
            <h2>Запрос консультации по системе</h2>
            <p><strong>Система:</strong> ${formData.get("product")}</p>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Компания:</strong> ${company}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <hr/>
            <p><strong>Сообщение:</strong><br/>${message}</p>
            </div>
        `;
    }

    // Обработка вложений
    const attachments = [];
    
    // Проверяем файл методом "duck typing" (безопасно для Node)
    // Если у объекта есть имя и метод arrayBuffer — мы считаем его файлом
    if (fileEntry && typeof fileEntry === 'object' && 'name' in fileEntry && 'arrayBuffer' in fileEntry) {
      const file = fileEntry as File; // Приводим тип для TS, но логика уже проверена
      
      if (file.size > 0) {
        console.log(`3. Обработка файла: ${file.name}`);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // Отправка
    console.log("4. Отправка письма...");
    await transporter.sendMail({
      from: `"Сайт" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: subject,
      html: htmlContent,
      attachments: attachments,
    });

    console.log("5. Письмо отправлено успешно");
    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    // Логируем ошибку подробно
    console.error("ОШИБКА В API:", error);
    return NextResponse.json(
      { message: "Server Error", error: String(error) }, 
      { status: 500 }
    );
  }
}