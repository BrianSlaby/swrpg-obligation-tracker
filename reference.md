<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Star Wars Edge of the Empire Obligation Tracker</title>
        <link rel="icon" type="image/png" href="/icons/icons8-star-wars-50.png">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />

        <link rel="stylesheet" href="/style.css">
    </head>

<body>
    <div class="app-container">
        <header>
            <h1>Star Wars: Edge of the Empire Obligation Tracker</h1>
        </header>

        <main>
            <div class="character-management-container">
                <div id="character-management-header">
                    
                </div>
                <div class="character-edit-container hidden">
                    <form class="flex-form">
                        <input 
                            id="character-name-input"
                            class="text-input"
                            type="text"
                            placeholder="New Player Character Name"
                        >
                        <button
                            id="character-name-submit-btn"
                            class="btn"
                        >Add Character</button>
                    </form>
                    <div 
                        class="character-list-container"
                        id="character-list-container"
                    >

                    </div>
                </div>
            </div>

            <div class="obligation-chart-container">

            </div>
        </main>
        <footer>
            <a target="_blank" href="https://icons8.com/icon/38539/star-wars">Star Wars</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </footer>
    </div>


    <script type="module" src="/index.js"></script>
</body>
</html>