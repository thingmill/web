MinecraftAPI.getServerStatus('62.210.45.19', {port:10135}, function(err, status) {
    if (err) {
        document.getElementById("player-count").innerHTML = 'Impossible de se connecter au serveur';
    } else {
        if (status.players.now > 1) {
            document.getElementById("player-count").innerHTML = status.players.now + " joueurs connectés";
        } else {
            document.getElementById("player-count").innerHTML = status.players.now + " joueur connecté";
        }
    }
});

var lastDropdownEntry = document.createElement("a");
lastDropdownEntry.className = "dropdown-link";
lastDropdownEntry.appendChild(document.createTextNode("Crédits"));
lastDropdownEntry.style = "cursor:pointer;";
lastDropdownEntry.addEventListener("click", function() {
    var overlay = document.createElement("div");
    var contributors = [{
        "name": "AntiJoinBot",
        "url": "http://dev.bukkit.org/bukkit-plugins/easy-anti-join-bot-proxie/"
    }, {
        "name": "AntiX-Ray",
        "url": "http://dev.bukkit.org/bukkit-plugins/anti-x-ray/"
    }, {
        "name": "AuthMe",
        "url": "http://dev.bukkit.org/bukkit-plugins/authme-reloaded/"
    }, {
        "name": "AutoAFK",
        "url": "https://www.spigotmc.org/resources/autoafk.11296/"
    }, {
        "name": "AutoSaveWorld",
        "url": "http://dev.bukkit.org/bukkit-plugins/autosaveworld/"
    }, {
        "name": "BarAPI",
        "url": "http://dev.bukkit.org/bukkit-plugins/bar-api/"
    }, {
        "name": "BukkitColors",
        "url": "http://dev.bukkit.org/bukkit-plugins/bukkitcolors/"
    }, {
        "name": "Buycraft",
        "url": "http://dev.bukkit.org/bukkit-plugins/buycraft/"
    }, {
        "name": "CTSNC",
        "url": "http://dev.bukkit.org/bukkit-plugins/c-t-s-n-c/"
    }, {
        "name": "ChestCommands",
        "url": "http://dev.bukkit.org/bukkit-plugins/chest-commands/"
    }, {
        "name": "ClearLag",
        "url": "http://dev.bukkit.org/bukkit-plugins/clearlagg/"
    }, {
        "name": "ColoredTags",
        "url": "http://dev.bukkit.org/bukkit-plugins/coloredtags/"
    }, {
        "name": "CustomHelpMessages",
        "url": "https://www.spigotmc.org/resources/customhelpmessage.3481/"
    }, {
        "name": "CustomJoinItems",
        "url": "http://dev.bukkit.org/bukkit-plugins/custom-join-items/"
    }, {
        "name": "CustomServerMessages",
        "url": "http://dev.bukkit.org/bukkit-plugins/csm/"
    }, {
        "name": "DrawMyThing",
        "url": "http://dev.bukkit.org/bukkit-plugins/draw-my-thing/"
    }, {
        "name": "DynamicTextures",
        "url": "http://dev.bukkit.org/bukkit-plugins/worldtextures/"
    }, {
        "name": "EasyWarp",
        "url": "http://dev.bukkit.org/bukkit-plugins/easywarp/"
    }, {
        "name": "Factions",
        "url": "http://dev.bukkit.org/bukkit-plugins/factions/"
    }, {
        "name": "Grand Theft Diamond",
        "url": "http://dev.bukkit.org/bukkit-plugins/grand-theft-diamond/"
    }, {
        "name": "Hats",
        "url": "http://dev.bukkit.org/bukkit-plugins/hatbernatixer/"
    }, {
        "name": "Holographic Displays",
        "url": "http://dev.bukkit.org/bukkit-plugins/holographic-displays/"
    }, {
        "name": "JSONAPI",
        "url": "http://mcjsonapi.com/"
    }, {
        "name": "Kits",
        "url": "http://dev.bukkit.org/bukkit-plugins/kits/"
    }, {
        "name": "LibsDisguises",
        "url": "https://www.spigotmc.org/resources/libs-disguises.81/"
    }, {
        "name": "MGSkyWars",
        "url": "http://dev.bukkit.org/bukkit-plugins/mglib-open-skywars/"
    }, {
        "name": "MassiveCore",
        "url": "http://dev.bukkit.org/bukkit-plugins/mcore/"
    }, {
        "name": "MinigamesLib",
        "url": "http://dev.bukkit.org/bukkit-plugins/instances-minigamesapi/"
    }, {
        "name": "Multiverse-Core",
        "url": "http://dev.bukkit.org/bukkit-plugins/multiverse-core/"
    }, {
        "name": "Multiverse-Portal",
        "url": "http://dev.bukkit.org/bukkit-plugins/multiverse-portals/"
    }, {
        "name": "NoCheatPlus",
        "url": "http://dev.bukkit.org/bukkit-plugins/nocheatplus/"
    }, {
        "name": "NoteBlockAPI",
        "url": "http://dev.bukkit.org/bukkit-plugins/noteblockapi/"
    }, {
        "name": "PerWorldChatPlus",
        "url": "http://dev.bukkit.org/bukkit-plugins/per-world-chat-plus/"
    }, {
        "name": "PerWorldInvertory",
        "url": "https://www.spigotmc.org/resources/per-world-inventory.4482/"
    }, {
        "name": "PerWorldMOTD",
        "url": "http://dev.bukkit.org/bukkit-plugins/perworldmotds/"
    }, {
        "name": "PerWorldPlugins",
        "url": "http://dev.bukkit.org/bukkit-plugins/perworldplugins/"
    }, {
        "name": "PerWorldTablist",
        "url": "http://dev.bukkit.org/bukkit-plugins/perworldtablist/"
    }, {
        "name": "PermissionsEX",
        "url": "http://dev.bukkit.org/bukkit-plugins/permissionsex/"
    }, {
        "name": "PingPlayer",
        "url": "http://dev.bukkit.org/bukkit-plugins/ping-player/"
    }, {
        "name": "Pixelator",
        "url": "http://dev.bukkit.org/bukkit-plugins/pixelator/"
    }, {
        "name": "PlotMe",
        "url": "http://dev.bukkit.org/bukkit-plugins/plotme/"
    }, {
        "name": "ProtocolLib",
        "url": "http://dev.bukkit.org/bukkit-plugins/protocollib/"
    }, {
        "name": "PvP2.0",
        "url": "http://dev.bukkit.org/bukkit-plugins/pvp/"
    }, {
        "name": "ServerMusic",
        "url": "http://dev.bukkit.org/bukkit-plugins/servermusic/"
    }, {
        "name": "SetSpawn",
        "url": "http://dev.bukkit.org/bukkit-plugins/setspawn/"
    }, {
        "name": "SignColors",
        "url": "https://www.spigotmc.org/resources/signcolors.6135/"
    }, {
        "name": "SignRanksPlus",
        "url": "http://dev.bukkit.org/bukkit-plugins/signranks/"
    }, {
        "name": "SimpleAutoMessage",
        "url": "http://dev.bukkit.org/bukkit-plugins/simpleautomessage/"
    }, {
        "name": "SimpleHelpOp",
        "url": "http://dev.bukkit.org/bukkit-plugins/simple-helpop/"
    }, {
        "name": "SkinsRestorer",
        "url": "https://www.spigotmc.org/resources/skinsrestorer.2124/"
    }, {
        "name": "Stats",
        "url": "http://dev.bukkit.org/bukkit-plugins/lolmewnstats/"
    }, {
        "name": "Simple Build Battle",
        "url": "https://www.spigotmc.org/resources/super-build-battle.8775/"
    }, {
        "name": "SuperVanish",
        "url": "https://www.spigotmc.org/resources/supervanish-1-7-1-8-1-9-compatible.1331/"
    }, {
        "name": "TNTRun",
        "url": "http://dev.bukkit.org/bukkit-plugins/tntrun/"
    }, {
        "name": "TPA",
        "url": "https://www.spigotmc.org/resources/tpa.1807/"
    }, {
        "name": "Vault",
        "url": "http://dev.bukkit.org/bukkit-plugins/vault/"
    }, {
        "name": "Vote4Diamonds",
        "url": "http://dev.bukkit.org/bukkit-plugins/vote4diamonds/"
    }, {
        "name": "WorldEdit",
        "url": "http://dev.bukkit.org/bukkit-plugins/worldedit/"
    }, {
        "name": "A SkyBlock",
        "url": "https://www.spigotmc.org/resources/a-skyblock.1220/"
    }, {
        "name": "Dynmap",
        "url": "http://dev.bukkit.org/bukkit-plugins/dynmap/"
    }, {
        "name": "iConomy",
        "url": "http://dev.bukkit.org/bukkit-plugins/iconomy/"
    }, {
        "name": "iControlU",
        "url": "http://dev.bukkit.org/bukkit-plugins/icontrolu/"
    }, {
        "name": "SexyMOTD",
        "url": "http://dev.bukkit.org/bukkit-plugins/sexy-motd/"
    }, {
        "name": "uCars",
        "url": "http://dev.bukkit.org/bukkit-plugins/ucars/"
    }, {
        "name": "WorldGuard",
        "url": "http://dev.bukkit.org/bukkit-plugins/worldguard/"
    }, {
        "name": "ChestShop",
        "url": "http://dev.bukkit.org/bukkit-plugins/chestshop/"
	}, {
        "name": "La map Faction",
        "url": "http://www.planetminecraft.com/project/alazar---factions-server-spawn-with-download/"
		}, {
        "name": "Merci beaucoup !",
        "url": "http://happyblocks.info"
    }];
    overlay.style = "z-index:9001;color:#fff;width:100vw;height:100vh;position:fixed;top:0;left:0;background:rgba(0,0,0,0.75);overflow-y:scroll;text-align:center;";
    overlay.id = "credit-overlay";
    var overlayContent = '<a style="background:rgba(255,255,255,0.2);padding:5px;float:right;font-size:20pt;cursor:pointer;margin:5px;font-weight:bold" onclick="document.body.removeChild(document.getElementById(\'credit-overlay\'));">X</a><h1>HappyBlocks ne serai pas possible sans les plugins suivants</h1><br><h3>Tous les noms sont cliquables</h3><div style="margin:auto;width:100%;max-width:840px;">';

    console.log(contributors);

    for (var i = 0; i < contributors.length; i++) {
        overlayContent += '<a href="' + contributors[i].url + '" style="text-align:center;width:200px;text-decoration:none;color:#000;border-radius:10px;background-color:rgba(255,255,255,0.75);padding:20px  5px;margin:5px;display:inline-block;">' + contributors[i].name + '</a>';
    }

    overlayContent += '</div>';
    overlay.innerHTML = overlayContent, 3;

    document.body.appendChild(overlay);
});

document.getElementById("Autre").appendChild(lastDropdownEntry);
