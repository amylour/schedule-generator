function generateSchedule() {
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    const projectDeadlines = {
        'PP1': new Date(document.getElementById('pp1-deadline').value),
        'PP2': new Date(document.getElementById('pp2-deadline').value),
        'PP3': new Date(document.getElementById('pp3-deadline').value),
        'PP4': new Date(document.getElementById('pp4-deadline').value),
        'PP5': new Date(document.getElementById('pp5-deadline').value)
    };

    const schedule = generateMockSchedule(startDate, endDate, projectDeadlines);
    renderSchedule(schedule);
}

function generateMockSchedule(startDate, endDate, projectDeadlines) {
    const curriculum = [
        { name: 'HTML', weeks: 1 },
        { name: 'CSS', weeks: 1 },
        { name: 'IDEs', weeks: 1 },
        { name: 'DESIGN', weeks: 1 },
        { name: 'JAVASCRIPT', weeks: 2 },
        { name: 'JQUERY', weeks: 1 },
        { name: 'JEST', weeks: 1 },
        { name: 'PYTHON', weeks: 2 },
        { name: 'FLASK', weeks: 2 },
        { name: 'BOOTSTRAP', weeks: 1 },
        { name: 'DJANGO', weeks: 2 },
        { name: 'PROJECT1', weeks: 4 },
        { name: 'PROJECT2', weeks: 4 },
        { name: 'PROJECT3', weeks: 4 },
        { name: 'PROJECT4', weeks: 6 },
        { name: 'PROJECT5', weeks: 8 }
    ];

    let currentDate = new Date(startDate);
    let remainingWeeks = Math.ceil((endDate - currentDate) / (7 * 24 * 60 * 60 * 1000));
    const schedule = [];

    curriculum.forEach(module => {
        if (module.name.startsWith('PROJECT')) {
            const deadline = projectDeadlines[module.name];
            if (deadline && deadline >= currentDate && deadline <= endDate) {
                const moduleEndDate = new Date(deadline);
                schedule.push({
                    module: module.name,
                    startDate: currentDate.toLocaleDateString(),
                    endDate: moduleEndDate.toLocaleDateString()
                });
                currentDate = new Date(moduleEndDate);
                currentDate.setDate(currentDate.getDate() + 1); // Move to next day
                remainingWeeks -= Math.ceil((moduleEndDate - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000));
            }
        } else {
            const weeks = Math.min(module.weeks, remainingWeeks);
            if (weeks > 0) {
                const moduleEndDate = new Date(currentDate);
                moduleEndDate.setDate(moduleEndDate.getDate() + (weeks * 7));
                schedule.push({
                    module: module.name,
                    startDate: currentDate.toLocaleDateString(),
                    endDate: moduleEndDate.toLocaleDateString()
                });
                currentDate = new Date(moduleEndDate);
                currentDate.setDate(currentDate.getDate() + 1); // Move to next day
                remainingWeeks -= weeks;
            }
        }
    });

    return schedule;
}

function renderSchedule(scheduleData, projectDeadlines) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    scheduleData.forEach(module => {
        const moduleDiv = document.createElement('div');
        if (module.module in projectDeadlines) {
            moduleDiv.innerHTML = `<strong>${module.module} Deadline:</strong> ${projectDeadlines[module.module].toLocaleDateString()}`;
        } else {
            moduleDiv.innerHTML = `<strong>${module.module}</strong>: ${module.startDate} - ${module.endDate}`;
        }
        scheduleContainer.appendChild(moduleDiv);
    });

    // Check and display any remaining project deadlines not included in the schedule
    Object.entries(projectDeadlines).forEach(([project, deadline]) => {
        if (!scheduleData.some(module => module.module === project)) {
            const moduleDiv = document.createElement('div');
            moduleDiv.innerHTML = `<strong>${project} Deadline:</strong> ${deadline.toLocaleDateString()}`;
            scheduleContainer.appendChild(moduleDiv);
        }
    });
}

function generateSchedule() {
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    const projectDeadlines = {
        'PP1': new Date(document.getElementById('pp1-deadline').value),
        'PP2': new Date(document.getElementById('pp2-deadline').value),
        'PP3': new Date(document.getElementById('pp3-deadline').value),
        'PP4': new Date(document.getElementById('pp4-deadline').value),
        'PP5': new Date(document.getElementById('pp5-deadline').value)
    };

    const schedule = generateMockSchedule(startDate, endDate, projectDeadlines);
    renderSchedule(schedule, projectDeadlines);
}

document.getElementById('generate-btn').addEventListener('click', generateSchedule);



