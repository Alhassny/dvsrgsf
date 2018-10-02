const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '>';



client.on('message', message => {
      if (message.author.kick) return;
      if (!message.content.startsWith(prefix)) return;
    
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
    
      let args = message.content.split(" ").slice(1);
    
      if (command == ">kick") {
                   if(!message.channel.guild) return;
             
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
      let user = message.mentions.users.first();
      let reason = message.content.split(" ").slice(2).join(" ");
    
      if (message.mentions.users.size < 1) return message.reply("منشن شخص");
      if(!reason) return message.reply ("اكتب سبب الطرد");
      if (!message.guild.member(user)
      .bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");
    
      message.guild.member(user).kick(7, user);


      message.channel.send(`**:white_check_mark: ${user.tag} has been kicked from the server ! :airplane: **  `)

    }
    });


    client.on('message', message => {
        if (message.author.codes) return;
        if (!message.content.startsWith(prefix)) return;
      
        let command = message.content.split(" ")[0];
        command = command.slice(prefix.length);
      
        let args = message.content.split(" ").slice(1);
      
        if (command == ">ban") {
                     if(!message.channel.guild) return message.reply('** This command only for servers**');
               
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
        let user = message.mentions.users.first();
        
        if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
        if (!message.guild.member(user)
        .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");
      
      
        message.guild.member(user).ban(7, user);
      
      message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `)
      
      }
      });



      client.on("message", message => {
        if (message.author.bot) return;
        
        let command = message.content.split(" ")[0];
        
        if (command === ">mute") {
              if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** You Have no Permission 'Manage Roles' **").catch(console.error);
        let user = message.mentions.users.first();
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
        if (!muteRole) return message.reply("** There is no Mute Role 'Muted' **").catch(console.error);
        if (message.mentions.users.size < 1) return message.reply('** Mention a User**').catch(console.error);
        
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setTimestamp()
          .addField('Usage:', '!mute')
          .addField('Muted:', `${user.username}#${user.discriminator} (${user.id})`)
          .addField('By:', `${message.author.username}#${message.author.discriminator}`)
         
         if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** You Have no Permission Manage Roles **').catch(console.error);
       
        if (message.guild.member(user).roles.has(muteRole.id)) {
      return message.reply("**:white_check_mark: .. Member Has been Muted**").catch(console.error);
      } else {
          message.guild.member(user).addRole(muteRole).then(() => {
      return message.reply("**:white_check_mark: .. Member Has Been Muted**").catch(console.error);
      });
        }
      
      };
      
    });





    client.on("message", message => {
        if (message.author.bot) return;
        
        let command = message.content.split(" ")[0];
        
        if (command === ">unmute") {
              if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** You Do Not have 'Manage Roles' Permission **").catch(console.error);
        let user = message.mentions.users.first();
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
        if (!muteRole) return message.reply("** You Do Not have 'Muted' Role **").catch(console.error);
        if (message.mentions.users.size < 1) return message.reply('** Mention a User**').catch(console.error);
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setTimestamp()
          .addField('Usage:', '!unmute')
          .addField('Unmuted:', `${user.username}#${user.discriminator} (${user.id})`)
          .addField('By:', `${message.author.username}#${message.author.discriminator}`)
      
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** No Manage Roles Permission **').catch(console.error);
      
        if (message.guild.member(user).removeRole(muteRole.id)) {
      return message.reply("**:white_check_mark: .. The User has been Unmuted **").catch(console.error);
      } else {
          message.guild.member(user).removeRole(muteRole).then(() => {
      return message.reply("**:white_check_mark: .. The User has been Unmuted **").catch(console.error);
      });
        }
      
      };
      
    });

    client.login(process.env.TOKEN)
