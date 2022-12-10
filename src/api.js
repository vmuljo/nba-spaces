    function _fetch(url) {
        return fetch(url).then((response) => {
        return response.json();
        });
    }

    export function fetchTeams() {
        return _fetch("http://localhost:4000/api/teams");
    }

    export function fetchTeam(teamId) {
        return _fetch(`http://localhost:4000/api/teams/${teamId}`);
    }
  
    export function fetchCommentsForSpace(spaceId) {
        return _fetch(`http://localhost:4000/api/comments?spaceId=${spaceId}`);
    }

    export function createSpace(teamId, spaceName, spacePassword){
        return fetch(`http://localhost:4000/api/spaces/`, {
            method: "POST",
            body: JSON.stringify({
                name: spaceName,
                password: spacePassword,
                teamId: teamId
            }),
            headers: {"Content-type":"application/json"},
        }).then((response) => {return response.json();
        });
    }

    export function fetchSpaces(teamId){
        return _fetch(`http://localhost:4000/api/spaces?teamId=${teamId}`);
    }

    export function fetchSpace(spaceId) {
        return _fetch(`http://localhost:4000/api/spaces/${spaceId}?_expand=team`);
    }

    // DELETE /spaces/:id
    export function deleteSpace(spaceId) {
        return fetch(
        `http://localhost:4000/api/spaces/${spaceId}`,
        {
            method: "DELETE",
        }
        );
    }
    
    // POST /comments
    export function saveComment(spaceId, user, timestamp, body) {
        return fetch("http://localhost:4000/api/comments", {
        method: "POST",
        body: JSON.stringify({
            timestamp: timestamp,
            user: user,
            body: body, // text from textarea
            spaceId: spaceId,
        }),
        headers: {
            "Content-type": "application/json",
        },
        }).then((response) => {
        return response.json();
        });
    }
    
    // PUT /posts/:id
    // PATCH /posts/:id
    export function updateSpace(spaceId, updatedTitle) {
        return fetch(
        `http://localhost:4000/api/spaces/${spaceId}`,
        {
            method: "PATCH",
            body: JSON.stringify({
            name: updatedTitle,
            }),
            headers: {
            "Content-type": "application/json",
            },
        }
        ).then((response) => {
        if (response.status >= 400) {
            return Promise.reject();
        }
    
        return response.json();
        });
    }
    