const express = require("express");
const app = express();
const PORT = 3000;

let students = [
    { id: 1, name: "Болд", age: 20, course: "Web" },
    { id: 2, name: "Сараа", age: 21, course: "Database" },
    { id: 3, name: "Тэмүүжин", age: 19, course: "Web" }
];
let nextId = 4;

function validateStudent(body) {
    const { name, age, course } = body || {};

    if (!name || typeof name !== "string") {
        return "name талбар шаардлагатай";
    }
    else if (!age || !Number.isInteger(age) || age < 16 || age > 100) {
        return "age нь 16-100 хоорондох бүхэл тоо байх ёстой";
    }
    else if (!course || typeof course !== "string") {
        return "course талбар шаардлагатай";
    }

    return null;
}

function validateId(id){
    if (Number.isNaN(id)) {
        return "ID нь тоо байх ёстой";
    }

    return null;
}

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Student API ажиллаж байна" });
});

app.get("/api/v1/students", (req, res) => {
    const { age, course, page = 1, limit = 10 } = req.query;

    let result = students;
    if (age) {
        result = result.filter((s) => s.age === Number(age));
    }
    if (course) {
        result = result.filter((s) => s.course.toLowerCase() === course.toLowerCase());
    }

    const p = Number(page);
    const l = Number(limit);
    const start = (p - 1) * l;

    res.json({
        total: result.length,
        page: p,
        limit: l,
        data: result.slice(start, start + l)
    })
});

app.post("/api/v1/students", (req, res) => {
    const errorMessage = validateStudent(req.body);
    if (errorMessage) {
        return res.status(400).json({success: false, message: errorMessage});
    }

    const { name, age, course } = req.body || {};
    const student = { id: nextId++, name, age, course };

    students.push(student);
    res.status(201).json(student);
});

//specific student id
app.get("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const errorMessage = validateId(id)
    if (errorMessage){
        return res.status(400).json({
            success: false,
            message: errorMessage
        });
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Оюутан олдсонгүй"
        });
    }
    res.json(student);
});

app.put("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Оюутан олдсонгүй"
        });
    }

    const errorMessage = validateStudent(req.body);
    if (errorMessage) {
        return res.status(400).json({success: false, message: errorMessage});
    }

    const { name, age, course } = req.body || {};
    students[index] = { id, name, age, course };

    res.json(students[index]);
});

app.delete("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Оюутан олдсонгүй"
        });
    }

    students.splice(index, 1);
    res.status(204).send();
});

// Байхгүй endpoint
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ийм endpoint байхгүй"
    });
});

// Алдаа барих middleware (4 параметртэй)
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "JSON формат буруу байна"
        });
    }

    console.error(err);
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} дээр ажиллаж байна`);
});
