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
        id: Date.now(),
        title, 
        description, 
        technology,
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
        card.dataset.index = index;
        card.innerHTML = `
            <h3>${index + 1}. ${project.title}</h3>
            <p><strong>Technology:</strong> ${project.technology}</p>
            <button onclick="showProjectDetails(${index})">View Details</button>
        `;
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

    document.getElementById("editProject").onclick = () => editProject(index);
    document.getElementById("deleteProject").onclick = () => deleteProject(index);

    document.getElementById("projectDetailModal").style.display = "block";
}

function closeModal() {
    document.getElementById("projectDetailModal").style.display = "none";
}

function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    closeModal();
    loadProjects();
}

function editProject(index) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let project = projects[index];

    const newTitle = prompt("Edit Title:", project.title);
    const newDesc = prompt("Edit Description:", project.description);
    const newTech = prompt("Edit Technology:", project.technology);

    if (newTitle && newDesc && newTech) {
        projects[index].title = newTitle;
        projects[index].description = newDesc;
        projects[index].technology = newTech;
        localStorage.setItem("projects", JSON.stringify(projects));
        closeModal();
        loadProjects();
    }
}
