<?php 

define('TIMESTAMP', strtotime("now"));

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="author" content="Sandor Fekete" />
    <title>ToDo App</title>	
    <link rel="stylesheet" href="css/todo.css?v=<?php echo TIMESTAMP ?>" />
</head>

<body>

    <div id="todo">
        <div class="header">
            <h1>ToDo List</h1>
            <input class="new" type="text" placeholder="What needs to be done?">
        </div>

        <ul>
        </ul>

        <hr>

        <div class="footer">
            <div class="table">
                <div class="table-row">
                    <div class="table-cell">
                        <label class="count"><span>0</span> item(s) pending</label>
                    </div>
                    <div class="table-cell">
                        <a class="button all active">All</a>
                        <a class="button pending">Pending</a>
                        <a class="button completed">Completed</a>
                    </div>
                    <div class="table-cell">
                        <a class="button clear">Clear Completed</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ul class="instructions">
        <li>* Uses browser localStorage.</li>
        <li>* Double-click ToDo list item to edit.</li>
        <li>* Hit ENTER to umm, enter stuff.</li>
    </ul>

    <script src="js/jquery-1.11.2.min.js"></script>
    <script src="js/todo.js?v=<?php echo TIMESTAMP ?>"></script>

</body>
</html>
