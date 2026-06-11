function renderResume() {
    loadNavbar();
    loadFooter();
    const langMap = {
        cn: {
            infoTitle: "个人信息 & 联系方式",
            name: "姓名",
            birth: "出生日期",
            major: "所学专业",
            degree: "学历",
            phone: "联系电话",
            email: "电子邮箱",
            skillTitle: "掌握技能",
            eduTitle: "教育经历",
            time: "就读时间",
            school: "毕业院校",
            majorEdu: "专业方向",
            course: "主修课程",
            pracTitle: "实习经历",
            pracTime: "实习时间",
            pracComp: "实习单位",
            pracPos: "岗位名称",
            pracContent: "工作内容",
            projTitle: "项目经历",
            projTime: "项目周期",
            projComp: "项目/单位",
            projPos: "担任角色",
            projContent: "项目内容",
            compTitle: "竞赛经历",
            compTime: "参赛时间",
            compOrg: "赛事名称",
            compAward: "所获荣誉",
            campTitle: "校园实践",
            campTime: "任职时间",
            campOrg: "组织名称",
            campPos: "职务",
            workTitle: "个人作品链接",
            workTip: "注：前两产品正等待成果转化，数据库未启用，因此无法注册与登录",
            loadErr: "数据加载失败，请使用 Live Server 运行！"
        },
        en: {
            infoTitle: "Personal Info & Contact",
            name: "Name",
            birth: "Birth Date",
            major: "Major",
            degree: "Degree",
            phone: "Phone",
            email: "Email",
            skillTitle: "Skills",
            eduTitle: "Education",
            time: "Period",
            school: "School",
            majorEdu: "Major Track",
            course: "Core Courses",
            pracTitle: "Internship",
            pracTime: "Period",
            pracComp: "Company",
            pracPos: "Position",
            pracContent: "Work Details",
            projTitle: "Projects",
            projTime: "Period",
            projComp: "Company/Team",
            projPos: "Role",
            projContent: "Project Details",
            compTitle: "Competitions",
            compTime: "Period",
            compOrg: "Contest",
            compAward: "Award",
            campTitle: "Campus Activities",
            campTime: "Period",
            campOrg: "Organization",
            campPos: "Position",
            workTitle: "Project Links",
            workTip: "Note: The two products are pending transformation, database is inactive, registration/login unavailable.",
            loadErr: "Failed to load data, please run with Live Server!"
        }
    };
    const currentLang = localStorage.getItem("resumeLang") || "cn";
    const langTxt = langMap[currentLang];
    const targetFile = currentLang === "cn" ? "data.txt" : "data-en.txt";

    fetch(targetFile)
        .then(res => res.text())
        .then(text => {
            const moduleData = {
                info: null,
                skill: [],
                edu: [],
                practice: [],
                project: [],
                competition: [],
                campus: [],
                works: []
            };
            const rawLines = text.split('\n');
            rawLines.forEach(line => {
                const trimLine = line.trim();
                if (trimLine === '' || trimLine.startsWith('//')) return;
                if (trimLine.startsWith('INFO_')) {
                    moduleData.info = trimLine.replace('INFO_', '');
                } else if (trimLine.startsWith('SKILL_')) {
                    moduleData.skill.push(trimLine.replace('SKILL_', ''));
                } else if (trimLine.startsWith('EDU_')) {
                    moduleData.edu.push(trimLine.replace('EDU_', ''));
                } else if (trimLine.startsWith('PRAC_')) {
                    moduleData.practice.push(trimLine.replace('PRAC_', ''));
                } else if (trimLine.startsWith('PRO_')) {
                    const projStr = trimLine.replace('PRO_', '');
                    moduleData.project.push(projStr);
                } else if (trimLine.startsWith('COMP_')) {
                    const compStr = trimLine.replace('COMP_', '');
                    moduleData.competition.push(compStr);
                } else if (trimLine.startsWith('CAMP_')) {
                    const campStr = trimLine.replace('CAMP_', '');
                    moduleData.campus.push(campStr);
                } else if (trimLine.startsWith('WORK_')) {
                    moduleData.works.push(trimLine.replace('WORK_', ''));
                }
            });

            if (moduleData.info) {
                const info = moduleData.info.split('|');
                const name = info[0] ?? '';
                const birth = info[1] ?? '';
                const major = info[2] ?? '';
                const degree = info[3] ?? '';
                const phone = info[4] ?? '';
                const email = info[5] ?? '';
                document.getElementById('info').innerHTML = `
                    <h3>${langTxt.infoTitle}</h3>
                    <div class="info-box">
                        <img src="images/1.jpg" alt="avatar" class="avatar">
                        <p><strong>${langTxt.name}：</strong>${name}</p>
                        <p><strong>${langTxt.birth}：</strong>${birth}</p>
                        <p><strong>${langTxt.major}：</strong>${major}</p>
                        <p><strong>${langTxt.degree}：</strong>${degree}</p>
                        <p><strong>${langTxt.phone}：</strong>${phone}</p>
                        <p><strong>${langTxt.email}：</strong>${email}</p>
                    </div>
                `;
                document.getElementById('info').style.display = 'block';
            } else {
                document.getElementById('info').innerHTML = '';
                document.getElementById('info').style.display = 'none';
            }

            if (moduleData.skill.length > 0) {
                let skillHtml = `<h3>${langTxt.skillTitle}</h3>`;
                moduleData.skill.forEach(skillStr => {
                    const skillArr = skillStr.split('@@').filter(item => item.trim() !== '');
                    skillHtml += `<ol>`;
                    skillArr.forEach(item => skillHtml += `<li>${item.trim()}</li>`);
                    skillHtml += `</ol>`;
                });
                document.getElementById('skill').innerHTML = skillHtml;
                document.getElementById('skill').style.display = 'block';
            } else {
                document.getElementById('skill').innerHTML = '';
                document.getElementById('skill').style.display = 'none';
            }

            if (moduleData.edu.length > 0) {
                let eduHtml = `<h3>${langTxt.eduTitle}</h3>`;
                moduleData.edu.forEach(eduStr => {
                    const eduData = eduStr.split('|');
                    const time = eduData[0] ?? '';
                    const school = eduData[1] ?? '';
                    const major = eduData[2] ?? '';
                    const course = eduData[3] ?? '';
                    eduHtml += `
                    <div style="margin-bottom:20px;">
                        <p><strong>${langTxt.time}：</strong>${time}</p>
                        <p><strong>${langTxt.school}：</strong>${school}</p>
                        <p><strong>${langTxt.majorEdu}：</strong>${major}</p>
                        <p><strong>${langTxt.course}：</strong>${course}</p>
                    </div>
                    `;
                });
                document.getElementById('edu').innerHTML = eduHtml;
                document.getElementById('edu').style.display = 'block';
            } else {
                document.getElementById('edu').innerHTML = '';
                document.getElementById('edu').style.display = 'none';
            }

            if (moduleData.practice.length > 0) {
                let pracHtml = `<h3>${langTxt.pracTitle}</h3>`;
                moduleData.practice.forEach(pracStr => {
                    const pracData = pracStr.split('|');
                    const time = pracData[0] ?? '';
                    const company = pracData[1] ?? '';
                    const pos = pracData[2] ?? '';
                    const descRaw = pracData[3] ?? '';
                    const pracList = descRaw.split('@@').filter(item => item.trim() !== '');
                    pracHtml += `
                    <div style="margin-bottom:20px;">
                        <p><strong>${langTxt.pracTime}：</strong>${time}</p>
                        <p><strong>${langTxt.pracComp}：</strong>${company}</p>
                        <p><strong>${langTxt.pracPos}：</strong>${pos}</p>
                        <p><strong>${langTxt.pracContent}：</strong></p><ol>
                    `;
                    pracList.forEach(item => pracHtml += `<li>${item.trim()}</li>`);
                    pracHtml += `</ol></div>`;
                });
                document.getElementById('practice').innerHTML = pracHtml;
                document.getElementById('practice').style.display = 'block';
            } else {
                document.getElementById('practice').innerHTML = '';
                document.getElementById('practice').style.display = 'none';
            }

            if (moduleData.project.length > 0) {
                let projHtml = `<h3>${langTxt.projTitle}</h3>`;
                moduleData.project.forEach(projStr => {
                    const projData = projStr.split('|');
                    const time = projData[0] ?? '';
                    const company = projData[1] ?? '';
                    const position = projData[2] ?? '';
                    const descRaw = projData[3] ?? '';
                    const descList = descRaw.split('@@').filter(item => item.trim() !== '');
                    projHtml += `
                    <div style="margin-bottom:20px;">
                        <p><strong>${langTxt.projTime}：</strong>${time}</p>
                        <p><strong>${langTxt.projComp}：</strong>${company}</p>
                        <p><strong>${langTxt.projPos}：</strong>${position}</p>
                        <p><strong>${langTxt.projContent}：</strong></p>
                        <ol>
                    `;
                    descList.forEach(txt => projHtml += `<li>${txt.trim()}</li>`);
                    projHtml += `</ol></div><br><br>`;
                });
                document.getElementById('project').innerHTML = projHtml;
                document.getElementById('project').style.display = 'block';
            } else {
                document.getElementById('project').innerHTML = '';
                document.getElementById('project').style.display = 'none';
            }

            if (moduleData.competition.length > 0) {
                let compHtml = `<h3>${langTxt.compTitle}</h3>`;
                moduleData.competition.forEach(compStr => {
                    const compData = compStr.split('|');
                    const time = compData[0] ?? '';
                    const org = compData[1] ?? '';
                    const award = compData[2] ?? '';
                    const descRaw = compData[3] ?? '';
                    const descList = descRaw.split('@@').filter(item => item.trim() !== '');
                    compHtml += `
                    <div style="margin-bottom:20px;">
                        <p><strong>${langTxt.compTime}：</strong>${time}</p>
                        <p><strong>${langTxt.compOrg}：</strong>${org}</p>
                        <p><strong>${langTxt.compAward}：</strong>${award}</p>
                        <p><strong>${langTxt.projContent}：</strong></p>
                        <ol>
                    `;
                    descList.forEach(txt => compHtml += `<li>${txt.trim()}</li>`);
                    compHtml += `</ol></div><br><br>`;
                });
                document.getElementById('competition').innerHTML = compHtml;
                document.getElementById('competition').style.display = 'block';
            } else {
                document.getElementById('competition').innerHTML = '';
                document.getElementById('competition').style.display = 'none';
            }

            if (moduleData.campus.length > 0) {
                let campHtml = `<h3>${langTxt.campTitle}</h3>`;
                moduleData.campus.forEach(campStr => {
                    const campData = campStr.split('|');
                    const time = campData[0] ?? '';
                    const org = campData[1] ?? '';
                    const position = campData[2] ?? '';
                    const descRaw = campData[3] ?? '';
                    const descList = descRaw.split('@@').filter(item => item.trim() !== '');
                    campHtml += `
                    <div style="margin-bottom:20px;">
                        <p><strong>${langTxt.campTime}：</strong>${time}</p>
                        <p><strong>${langTxt.campOrg}：</strong>${org}</p>
                        <p><strong>${langTxt.campPos}：</strong>${position}</p>
                        <p><strong>${langTxt.pracContent}：</strong></p>
                        <ol>
                    `;
                    descList.forEach(txt => campHtml += `<li>${txt.trim()}</li>`);
                    campHtml += `</ol></div><br><br>`;
                });
                document.getElementById('campus').innerHTML = campHtml;
                document.getElementById('campus').style.display = 'block';
            } else {
                document.getElementById('campus').innerHTML = '';
                document.getElementById('campus').style.display = 'none';
            }

            if (moduleData.works.length > 0) {
                let workHtml = `<h3>${langTxt.workTitle}</h3><ol>`;
                moduleData.works.forEach(workStr => {
                    const workList = workStr.split('@@').filter(item => item.trim() !== '');
                    workList.forEach(item => {
                        const workItem = item.split('|');
                        const workName = workItem[0] ?? '';
                        const workUrl = workItem[1] ?? '';
                        workHtml += `<li><a href="${workUrl.trim()}" target="_blank">${workName.trim()}</a></li>`;
                    });
                });
                workHtml += `</ol>
                <p style="margin-top:12px;color:#666;font-size:14px;">${langTxt.workTip}</p>`;
                document.getElementById('works').innerHTML = workHtml;
                document.getElementById('works').style.display = 'block';
            } else {
                document.getElementById('works').innerHTML = '';
                document.getElementById('works').style.display = 'none';
            }
        })
        .catch(err => {
            console.log("读取txt失败：", err);
            alert(langMap[currentLang].loadErr);
        });
}

window.onload = renderResume;
