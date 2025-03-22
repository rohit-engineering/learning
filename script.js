document.addEventListener("DOMContentLoaded", loadProjects);

function addProject() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const technology = document.getElementById("technology").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;

    if (!title || !description || !technology || !startDate || !endDate) {
        alert("Please fill all fields!");
        return;
    }

    const project = {
        title, description, technology,
        start: `${startDate} (${startTime})`,
        end: `${endDate} (${endTime})`
    };

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    window.location.href = "projects.html";
}

function loadProjects() {
    const projectsGrid = document.getElementById("projectsGrid");
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = "";
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach((project, index) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
            <h3>${index + 1}. ${project.title}</h3>
        `;
        card.addEventListener("click", () => showProjectDetails(index));
        projectsGrid.appendChild(card);
    });
}

function showProjectDetails(index) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects[index];

    document.getElementById("modalTitle").innerText = project.title;
    document.getElementById("modalDescription").innerText = project.description;
    document.getElementById("modalTechnology").innerText = project.technology;
    document.getElementById("modalStart").innerText = project.start;
    document.getElementById("modalEnd").innerText = project.end;
    document.getElementById("projectDetailModal").style.display = "block";
}

function closeModal() {
    document.getElementById("projectDetailModal").style.display = "none";
}
