// Load data from a JSON larps and display it on the page
document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/data/larps260908.json')
        .then(response => response.json())
        .then(data => {
            const friday2 = document.getElementById('scheduleFriday2');
            const saturday1 = document.getElementById('scheduleSaturday1');
            const saturday2 = document.getElementById('scheduleSaturday2');
            const sunday1 = document.getElementById('scheduleSunday1');

            data.forEach(larp => {
                const larpDiv = document.createElement('div');
                larpDiv.classList.add('panel-group');
                larpDiv.id = larp.key;
                larpDiv.setAttribute('role', 'tablist');
                larpDiv.setAttribute('aria-multiselectable', 'true');

                larpDiv.innerHTML = `
                    <div class="panel panel-default lgx-panel">
                        <div class="panel-heading" role="tab" id="heading${larp.key}">
                            <div class="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#${larp.key}"
                                   href="#collapse${larp.key}" aria-expanded="true"
                                   aria-controls="collapse${larp.key}">
                                    <div class="lgx-single-schedule">
                                        <div class="author">
                                            <div class="image-container">
                                                <img src="assets/img/games/${larp.key}.png" alt="Larp image" class="main-image"/>
                                             </div>
                                        </div>
                                        <div class="schedule-info">
                                            <div>
                                                ${larp.tags ? larp.tags.map(tag => `<h4 class="tags">${tag}</h4>`).join(' ') : ''}
                                            </div>
                                            <div>
                                                <h4 class="time">${larp.length}</h4>
                                                <h4 class="players">gracze: ${larp.players}</h4>
                                            </div>
                                            <h3 class="title">${larp.title}</h3>
                                            <h4 class="author-info">MG: <span>${larp.author}</span></h4>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div id="collapse${larp.key}" class="panel-collapse collapse out"
                             role="tabpanel"
                             aria-labelledby="heading${larp.key}">
                            <div class="panel-body">
                                <section class="text">
                                    ${larp.description}
                                </section>
                                <section>
                                    ${larp.doc ? `<a href="${larp.doc}" target="_blank" class="btn btn-primary">Design Doc</a>` : ''}
                                </section>
                                <section>
                                    ${larp.triggers ? `<h4 class="blank">Triggery:</h4>` : ''}
                                    ${larp.triggers ? larp.triggers.map(trigger => `<h4 class="triggers">${trigger}</h4>`).join(' ') : ''}
                                </section>
                                <!-- <h4 class="location"><strong>Sala:</strong> 3 Kominkowa </h4>-->
                            </div>
                        </div>
                    </div>
                `;

                switch (larp.slot) {
                    case 'friday2':
                        friday2.appendChild(larpDiv);
                        break;
                    case 'saturday1':
                        saturday1.appendChild(larpDiv);
                        break;
                    case 'saturday2':
                        saturday2.appendChild(larpDiv);
                        break;
                    case 'sunday1':
                        sunday1.appendChild(larpDiv);
                        break;
                    default:
                        console.error(`Invalid day: ${larp.day}`);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


// Load data from a JSON larps and display it on the page
document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/data/creators250826.json')
        .then(response => response.json())
        .then(data => {
            const creators = document.getElementById('creators');

            data = data.slice().sort(() => Math.random() - 0.5);

            data.forEach((creator, index) => {
                const rowId = Math.floor(index / 4);
                if (index % 4 === 0) {
                    const creatorRow = document.createElement('div');
                    creatorRow.classList.add(`row`);
                    creatorRow.classList.add(`row-${rowId}`);
                    creators.appendChild(creatorRow);
                }

                const row = creators.querySelector(`.row-${rowId}`);

                const creatorDiv = document.createElement('div');
                creatorDiv.classList.add('col-xs-12');
                creatorDiv.classList.add('col-sm-6');
                creatorDiv.classList.add('col-md-3');

                creatorDiv.innerHTML = `
                    <div class="lgx-single-speaker2 lgx-single-speaker3">
                        <figure>
                            <a class="profile-img"><img
                                    src="/assets/img/people/${creator.filename}"
                                    alt="Speaker"/></a>
                            <figcaption>
                                <div class="speaker-info">
                                    <h3 class="title"><a>${creator.name}</a></h3>
                                    <h4 class="subtitle">${creator.larp}</h4>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                `;

                row.appendChild(creatorDiv);

            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});