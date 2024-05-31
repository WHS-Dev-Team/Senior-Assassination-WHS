(function () {
    const dataAPIendpoint = "http://localhost:8080/api/people";

    async function fetchData() {
        try {
            const response = await fetch(dataAPIendpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function getRandomAlivePerson(listofPeople) {
        try {
            const alivePeople = listofPeople.filter(
                (person) => person.status === "alive" && person.taken === false
            );

            if (alivePeople.length === 0) {
                return null;
            }

            const randomIndex = Math.floor(Math.random() * alivePeople.length);
            return alivePeople[randomIndex];
        } catch (error) {
            console.error("Error fetching alive people:", error);
            return null;
        }
    }


    ///check-if-alive/:name endpoint
    async function checkIfAlive(name) {
        const response = await fetch(
            `http://localhost:8080/api/check-if-alive/${name}`
        );
        const person = await response.json();
        return person;
    }

    async function checkIfTaken(name) {
        const response = await fetch(
            `http://localhost:8080/api/check-if-taken/${name}`
        );
        const person = await response.json();
        return person;
    }

    async function getStoredPerson() {
        const storedPerson = JSON.parse(
            localStorage.getItem("assassinationTarget")
        );
        if (storedPerson) {
            try {
                const isAlive = await checkIfAlive(storedPerson.name || storedPerson[0].name);

                if (isAlive) {
                    return storedPerson;S
                } else {
                    localStorage.removeItem("assassinationTarget");
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }

 
    function saveNewTarget(person) {
        localStorage.setItem("assassinationTarget", JSON.stringify(person));
    }


     

    async function main() {
        console.log("main() run");
        const data = await fetchData();
        
           const image = document.getElementById("person-image");
        const name = document.getElementById("person-name");
        const status = document.getElementById("person-status");
        console.log('data', data)
        
        const person = await getStoredPerson() || await getRandomAlivePerson(data[0].length>0?data[0]:data);
        image.src = person.image || person[0].image;
        name.textContent = person.name || person[0].name;
        status.textContent = person.status || person[0].status;



        status.style.backgroundColor =
            person.status === "alive" ? "green" : "red";

            saveNewTarget(person);
    }



    document.addEventListener("DOMContentLoaded", () => {
        console.log("DOMContentLoaded event fired");
        main();
    });
})();