document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/data/organisers260208.json')
        .then(response => response.json())
        .then(data => {
            const creators = document.getElementById('organisers');
            const creatorsBio = document.getElementById('organisers-content');

            // Group members by team name
            const teamsMap = new Map();

            data.forEach(member => {
                if (!teamsMap.has(member.team)) {
                    teamsMap.set(member.team, { leader: null, members: [] });
                }
                const teamGroup = teamsMap.get(member.team);
                if (member.role === 'leader') {
                    teamGroup.leader = member;
                } else {
                    teamGroup.members.push(member);
                }
            });

            // Render each team with leader + members, honorable mentions last
            const orderedTeams = [...teamsMap.keys()].sort((a, b) => {
                if (a === 'honorable') return 1;
                if (b === 'honorable') return -1;
                return 0;
            });

            orderedTeams.forEach(teamNameKey => {
                const group = teamsMap.get(teamNameKey);
                let teamName = teamNameKey;
                if (teamName === 'honorable') {
                    teamName = 'Honorable mentions<br>(to oni tworzyli z nami poprzednie Krak-ONy i dołożyli dużą cegiełkę do obecnego kształtu festiwalu)';
                }

                // Team title
                const titleBar = document.createElement('div');
                titleBar.classList.add('team-title-bar');
                titleBar.innerHTML = `<h2>${teamName}</h2>`;
                creators.appendChild(titleBar);

                // Create rows of max 4 members
                const membersAll = [];

                if (group.leader) membersAll.push(group.leader);
                membersAll.push(...group.members);

                // Create rows, max 4 per row
                for (let i = 0; i < membersAll.length; i += 4) {
                    const row = document.createElement('div');
                    row.classList.add('row');
                    const slice = membersAll.slice(i, i + 4);

                    slice.forEach(member => {
                        const memberDiv = createMemberDiv(member);
                        row.appendChild(memberDiv);
                    });

                    creators.appendChild(row);
                }
            });

            // Render bios below
            data.forEach(member => {
                const bioDiv = document.createElement('div');
                bioDiv.classList.add('row');
                bioDiv.id = member.key;
                bioDiv.innerHTML = `
                    <div class="col-lg-3">
                        <figure><img src="/assets/img/people/${member.filename}" alt="${member.name}"></figure>
                    </div>
                    <div class="col-lg-9">
                        <h2>${member.name}</h2>
                        <p>${member.bio}</p>
                    </div>
                `;
                creatorsBio.appendChild(bioDiv);
            });

            function createMemberDiv(member) {
                const div = document.createElement('div');
                div.classList.add('col-xs-12', 'col-sm-6', 'col-md-3');
                div.innerHTML = `
                    <div class="lgx-single-speaker2 lgx-single-speaker3">
                        <figure>
                            <a class="profile-img" href="#${member.key}">
                                <img src="/assets/img/people/${member.filename}" alt="${member.name}"/>
                            </a>
                            <figcaption>
                                <div class="speaker-info">
                                    <h3 class="title"><a>${member.role === 'leader' ? '⭐ ' : ''}${member.name}</a></h3>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                `;
                return div;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
