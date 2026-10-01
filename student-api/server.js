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
    res.json(students);
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
