/*
 * ToDo App v.1.0
 * 
 * Sandor Fekete
 * http://www.sandorfekete.com/todo
 */

(function()
{

    var TODO = {
        
        items: [],
        
        init: function()
        {
            TODO.load();

            TODO.bindNew();
            TODO.bindCheck();
            TODO.bindItem();
            TODO.bindRemove();
            TODO.bindAll();
            TODO.bindPending();
            TODO.bindCompleted();
            TODO.bindClear();

            TODO.updateCount();

            $('#todo .new').focus();
        },
        
        load: function()
        {
            var data = localStorage.getItem('todo');

            if (data)
            {
                TODO.items = JSON.parse(data);
            }

            for (var i = 0; i < TODO.items.length; i++)
            {
                var item = TODO.items[i];

                $('#todo ul').append('<li class="' + item.state + '"><label class="item">' + item.value + '</label><input class="item" type="text" value="' + item.value + '"><input class="check" type="checkbox" ' + (item.state == 'completed' ? 'checked' : '') + '><a class="button remove">x</a></li>');
            }
        },
        
        save: function()
        {
            TODO.items = [];

            $('#todo ul li').each(function(elem)
            {
                var item = {};
                item.value = $(this).find('.item').text();
                item.state = $(this)[0].className;

                TODO.items.push(item);
            });

            //console.dir(TODO.items);

            localStorage.setItem('todo', JSON.stringify(TODO.items));
        },
        
        bindNew: function()
        {
            $('#todo .new').keyup(function(event)
            {
                if (event.which == 13)
                {
                    var value = $('#todo .new').val();

                    $('#todo ul').prepend('<li class="pending"><label class="item">' + value + '</label><input class="item" type="text" value="' + value + '"><input class="check" type="checkbox"><a class="button remove">x</a></li>');

                    TODO.bindCheck();
                    TODO.bindItem();
                    TODO.bindRemove();
                    TODO.updateCount();
                    TODO.save();

                    $(this).val('').focus();
                }
            });
        },
        
        bindCheck: function()
        {
            $('#todo .check').off('click');

            $('#todo .check').click(function()
            {
                var $parent = $(this).parent('li');
                var state = $($parent)[0].className;

                $($parent).removeClass();
                $($parent).addClass(state == 'pending' ? 'completed' : 'pending');

                TODO.updateCount();

                if ($('#todo a.pending').hasClass('active'))
                {
                    $(this).parent('li').hide();
                }
                else if ($('#todo a.completed').hasClass('active'))
                {
                    $(this).parent('li').hide();
                }

                TODO.save();
            });
        },
        
        bindItem: function()
        {
            $('#todo label.item').off('dblclick');
            $('#todo input.item').off('keyup');

            $('#todo label.item').dblclick(function()
            {
                $(this).hide().siblings('input.item').show().focus();
            });

            $('#todo input.item').keyup(function(event)
            {
                if (event.which == 13)
                {
                    $(this).hide().siblings('label.item').text($(this).val()).show();
                    TODO.save();
                    $('#todo .new').focus();
                }
            });
        },
        
        bindRemove: function()
        {
            $('#todo .remove').off('click');

            $('#todo .remove').click(function()
            {
                $(this).parent('li').remove();
                TODO.updateCount();
                TODO.save();
            });
        },
        
        bindAll: function()
        {
            $('#todo a.all').click(function()
            {
                $('#todo li').show();
                $('#todo .footer a').removeClass('active');
                $(this).addClass('active');
            });
        },
        
        bindPending: function()
        {
            $('#todo a.pending').click(function()
            {
                $('#todo li').hide().filter('.pending').show();
                $('#todo .footer a').removeClass('active');
                $(this).addClass('active');
            });
        },
        
        bindCompleted: function()
        {
            $('#todo a.completed').click(function()
            {
                $('#todo li').hide().filter('.completed').show();
                $('#todo .footer a').removeClass('active');
                $(this).addClass('active');
            });
        },
        
        bindClear: function()
        {
            $('#todo a.clear').click(function()
            {
                $('#todo li.completed').remove();
                TODO.updateCount();
                TODO.save();
            });
        },
        
        updateCount: function()
        {
            var count = $('#todo li.pending').length;
            $('#todo .count span').text(count);
        }

    };

    TODO.init();

})();
