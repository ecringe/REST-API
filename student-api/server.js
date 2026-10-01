const express = require("express");
const app = express();
const PORT = 3000;

let students = [
    { id: 1, name: "Болд", age: 20, course: "Web" },
    { id: 2, name: "Сараа", age: 21, course: "Database" },
    { id: 3, name: "Тэмүүжин", age: 19, course: "Web" }
];
let nextId = 4;

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
        result = result.filter(
        (s) => s.course.toLowerCase() === course.toLowerCase()
        );
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
    const { name, age, course } = req.body || {};
    const student = { id: nextId++, name, age, course };

    students.push(student);
    res.status(201).json(student);
});

app.get("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Оюутан олдсонгүй"
        });
    }
    res.json(student);
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} дээр ажиллаж байна`);
});
