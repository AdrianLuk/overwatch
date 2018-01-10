// if (window.jQuery) {
//     alert('works');
// } else {
//     alert('nope');
// }
$(document).ready(function () {
    $('#app').click(function (ev) {
        ev.preventDefault();
        $('#app').removeClass('selected animated');
        $('#about').removeClass('selected animated');
        $(this).addClass('selected animated');
        $.ajax({
            url: 'app.html',
            dataType: 'html',
            success: function (app) {
                $('#main-content').html(app);
            }
        });
    });
    $('#about').click(function (e) {
        e.preventDefault();
        $('#about').removeClass('selected animated');
        $('#app').removeClass('selected animated');
        $(this).addClass('selected animated');
        $.ajax({
            url: 'about.html',
            dataType: 'html',
            success: function (about) {
                $('#main-content').html(about);
            }
        });
    });
    // AJAX request the Overwatch API
    $.ajax({
        url: 'https://overwatch-api.net/api/v1/hero/',
        dataType: 'json',
        // trying to get the page to cache to reduce stress on the api servers so that you don't hit the 500 requests per hour limit
        // complete: function(xhr, textStatus){
        // var eTag = xhr.getResponseHeader('ETag');
        // var request = new XMLHttpRequest('If-None-Match');
        // request.open('GET', 'http://overwatch-api.net/api/v1/hero');
        // var limit = xhr.getResponseHeader('x-ratelimit-remaining');
        //    var tagstatus = xhr.getAllResponseHeaders();
        //    var mymatch = xhr.getResponseHeader('If-None-Match');
        // var tags = xhr.status;
        // request.open('GET', 'http://overwatch-api.net/api/v1/hero');
        // xhr.setRequestHeader('Accept', 'application/json');
        //    var matcher = request.setRequestHeader('If-None-Match',' "5218e9cdd083980f0f22b3cf6d9481ca"');
        //    request.send(matcher);
        // var tagmatch = xhr.getResponseHeader('Cache-control');
        // var matcher = xhr.setRequestHeader('If-None-Match: "5218e9cdd083980f0f22b3cf6d9481ca"');
        // console.log(eTag);
        //
        // console.log(tagmatch);
        // console.log(matcher);
        // console.log(tagstatus);
        // console.log(tags);
        // console.log(matcher);
        // console.log(limit);
        // console.log(mymatch);
        // console.log(request);
        // },
        success: function (data) {
            $('#appbody').css({
                'background': 'linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)), url(img/logo.jpg) no-repeat fixed',
                'background-size': 'cover',
                'background-position': '50% 0%',
                'color': '#000'
            });
            $('#skinframe').css({
                'visibility': 'hidden'
            });
            $('#hero-list ul').html('');
            for (i = 0; i < data.data.length; i++) {
                // console.log(data.data[i].name);
                var hero_name = data.data[i].name;
                var description = data.data[i].description;
                var health = data.data[i].health;
                var armour = data.data[i].armour;
                var shield = data.data[i].shield;
                var real_name = data.data[i].real_name;
                var age = data.data[i].age;
                $('#hero-list ul').append('<li><a data-hero="' + data.data[i].url + '" href="#">' + hero_name + '</a></li>');
            }
            $('#hero-list ul li a').click(function (event) {
                event.preventDefault();
                hero_file = $(this).data('hero');
                $('#skinframe').css({
                    'visibility': 'visible'
                });
                $.ajax({
                    url: hero_file,
                    dataType: 'json',
                    success: function (hero) {
                        $('#abilities').empty();
                        $('#skin-list').empty();
                        $('#strong').empty();
                        $('#weak').empty();
                        hero_name = hero.name;
                        $('#hero').html(hero_name);
                        var role = hero.role.name;
                        description = hero.description;
                        health = hero.health;
                        armour = hero.armour;
                        shield = hero.shield;
                        real_name = hero.real_name;
                        age = hero.age;
                        var affiliation = hero.affiliation;
                        var origin = hero.base_of_operations;
                        var id = hero.id - 1;
                        if (hero_name == 'Orisa') {
                            age = '1 month';
                        }
                        if (hero_name == 'Soldier: 76') {
                            hero_name = 'soldier_76';
                            origin = 'Bloomington, Indiana, United States';
                        }
                        if (hero_name == 'Symmetra') {
                            shield = '100';
                        }
                        if (hero_name == 'D.Va') {
                            health = 400;
                            armour = 200;
                        }
                        if (hero_name == 'Lúcio') {
                            hero_name = 'lucio';
                        }
                        var total_health = health + armour + shield;
                        //   console.log(hero_name);
                        $('#real_name').html(real_name);
                        $('#description').html(description);
                        $('#health').html(health);
                        $('#armour').html(armour);
                        $('#shield').html(shield);
                        $('#age').html(age);
                        $('#affiliation').html(affiliation);
                        $('#origin').html(origin);
                        $('#role').html(role);
                        $('#total_health').html(total_health);
                        $('#health_bar').html('<div class="progress"><div class="progress-bar" role="progressbar" style="background-color: #AAAAB7; width: ' + ((health / total_health) * 100) + '%; height: 40px"></div><div class="progress-bar" role="progressbar" style="background-color: #d0c319; width: ' + ((armour / total_health) * 100) + '%; height: 40px"></div><div class="progress-bar" role="progressbar" style="background-color: #00cce0; width: ' + ((shield / total_health) * 100) + '%; height: 40px"></div></div>');
                        for (var j = 0; j < hero.abilities.length; j++) {
                            var ultimate = hero.abilities[j].is_ultimate;
                            if (ultimate == false) {
                                $('#abilities').append('<h3 class="text-light" id="ability">Ability ' + (j + 1) + '</h3><h2 class="ability_name display-4">' + hero.abilities[j].name + '</h2><p>' + hero.abilities[j].description + '</p></div>');
                            } else if (ultimate == true) {
                                $('#abilities').append('<h3 class="text-warning display-4" id="ability">Ultimate Ability</h3><h2 class="ability_name display-4">' + hero.abilities[j].name + '</h2><p>' + hero.abilities[j].description + '</p></div>');
                            }
                        }
                        $.ajax({
                            url: 'data.json',
                            dataType: 'json',
                            success: function (cosmetics) {
                                // var icon = datas.data[i].icon;
                                var skinslist = cosmetics.data[id].skins;
                                $('#icon').html('<img src="' + cosmetics.data[id].icon.toLowerCase() + '" alt="' + cosmetics.data[id].name + '">');
                                for (var k = 0; k < skinslist.length; k++) {
                                    var skin_name = cosmetics.data[id].skins[k].name.toLowerCase();
                                    var skin_pic = cosmetics.data[id].skins[k].image.toLowerCase();
                                    $('#skin-list').append('<a class="nav-link btn-primary p-3 m-3" href="' + k + '">' + skin_name + '</a>');
                                }
                                $('#skinframe').attr({
                                    'src': 'img/' + hero_name.toLowerCase() + '/classic.png',
                                    'alt': hero_name + 'classic'
                                });
                                $('#skin_title').html('Classic');
                                $('#skin-list a').click(function (e) {
                                    e.preventDefault();
                                    var skin_index = $(this).attr('href');
                                    skin_name = cosmetics.data[id].skins[skin_index].name.toLowerCase();
                                    skin_pic = cosmetics.data[id].skins[skin_index].image.toLowerCase();
                                    console.log(skin_name);
                                    console.log(skin_pic);
                                    $('#skinframe').attr({
                                        'src': skin_pic,
                                        'alt': skin_name
                                    });
                                    $('#skin_title').html(skin_name);
                                });
                                $('#appbody').css({
                                    'background': 'url(img/' + hero_name.toLowerCase() + '/classic.png) no-repeat fixed',
                                    'background-size': 'cover',
                                    'background-position': '50% 0%',
                                    'color': '#fff',
                                });
                                var strongList = cosmetics.data[id].strong;
                                var weakList = cosmetics.data[id].weak;
                                for (var x = 0; x < strongList.length; x++) {
                                    var strongName = cosmetics.data[id].strong[x].toLowerCase();
                                    $('#strong').append('<img class="img-fluid p-3" src="img/' + strongName + '/' + strongName + '.thumb.png" alt="' + strongName + '">');
                                }
                                for (var y = 0; y < weakList.length; y++) {
                                    var weakName = cosmetics.data[id].weak[y].toLowerCase();
                                    $('#weak').append('<img class="img-fluid p-3" src="img/' + weakName + '/' + weakName + '.thumb.png" alt="' + weakName + '">');
                                }
                                if (role == 'offense') {
                                    $('#role').css({
                                        'color': '#dc3545'
                                    });
                                    $('#hero').css({
                                        'color': '#dc3545'
                                    });
                                    $('#real_name').css({
                                        'color': '#dc3545'
                                    });
                                    $('.ability_name').css({
                                        'color': '#dc3545'
                                    });
                                } else if (role == 'defense') {
                                    $('#role').css({
                                        'color': '#28a745'
                                    });
                                    $('#hero').css({
                                        'color': '#28a745'
                                    });
                                    $('#real_name').css({
                                        'color': '#28a745'
                                    });
                                    $('.ability_name').css({
                                        'color': '#28a745'
                                    });
                                } else if (role == 'support') {
                                    $('#role').css({
                                        'color': '#ffa500'
                                    });
                                    $('#hero').css({
                                        'color': '#ffa500'
                                    });
                                    $('#real_name').css({
                                        'color': '#ffa500'
                                    });
                                    $('.ability_name').css({
                                        'color': '#ffa500'
                                    });
                                } else if (role == 'tank') {
                                    $('#role').css({
                                        'color': '#007bff'
                                    });
                                    $('#hero').css({
                                        'color': '#007bff'
                                    });
                                    $('#real_name').css({
                                        'color': '#007bff'
                                    });
                                    $('.ability_name').css({
                                        'color': '#007bff'
                                    });
                                }
                            }
                        });// third ajax function
                    }
                });// second ajax function
            });
        }
    });// first ajax function
});
