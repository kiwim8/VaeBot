module.exports = Cmds.addCommand({
    cmds: [';info '],

    requires: {
        guild: true,
        loud: false,
    },

    desc: 'Get info about a user',

    args: '([@user] | [id] | [name])',

    example: 'vae',

    func: (cmd, args, msgObj, speaker, channel, guild) => {
        const target = Util.getEitherByMixed(args, guild);
        if (target == null) return Util.commandFailed(channel, speaker, 'User not found');

        const isMuted = Mutes.checkMuted(target.id, guild);
        const historyStr = Util.historyToString(Util.getHistory(target.id, guild));

        const createdAt = target.createdAt || target.user.createdAt;
        // const timeStr = `${Util.getYearStr(createdAt)}-${Util.getMonthStr(createdAt)}-${Util.getDayStr(createdAt)}`;
        const highestRole = Util.getHighestRole(target);
        const powerRating = `${Util.toFixedCut(Util.getPermRating(guild, target), 3)}%`;

        const sendEmbedFields = [];

        sendEmbedFields.push({ name: 'ID', value: target.id });
        sendEmbedFields.push({ name: 'Username', value: target.toString() });
        sendEmbedFields.push({ name: 'Nickname', value: (target.nickname != null ? Util.safe(target.nickname) : 'N/A') });
        sendEmbedFields.push({ name: 'Discriminator', value: target.discriminator });
        sendEmbedFields.push({ name: 'Staff', value: Util.capitalize(Util.checkStaff(guild, target)) });
        sendEmbedFields.push({ name: 'Rank', value: highestRole ? `${highestRole.name} (${highestRole.position})` : 'None' });
        sendEmbedFields.push({ name: 'Power', value: powerRating });
        sendEmbedFields.push({ name: 'Status', value: Util.capitalize(target.presence.status) });
        sendEmbedFields.push({ name: 'Bot', value: Util.capitalize(target.bot || target.user.bot) });
        sendEmbedFields.push({ name: 'Game', value: (target.presence.game != null) ? Util.capitalize(target.presence.game.name) : 'N/A' });
        sendEmbedFields.push({ name: 'Muted', value: Util.capitalize(isMuted) });
        sendEmbedFields.push({ name: 'Mute History', value: historyStr });
        sendEmbedFields.push({ name: 'Mic Muted', value: Util.capitalize(target.selfMute) });
        sendEmbedFields.push({ name: 'Deafened', value: Util.capitalize(target.selfDeaf) });
        sendEmbedFields.push({ name: 'Server Mic Muted', value: Util.capitalize(target.serverMute) });
        sendEmbedFields.push({ name: 'Server Deafened', value: Util.capitalize(target.serverDeaf) });
        sendEmbedFields.push({ name: 'Registered', value: (createdAt != null ? Util.getDateString(createdAt) : 'N/A') });
        sendEmbedFields.push({ name: `Joined ${guild.name}`, value: (target.joinedAt != null ? Util.getDateString(target.joinedAt) : 'N/A') });
        sendEmbedFields.push({ name: 'Avatar', value: Util.getAvatar(target, true) });

        // var newDesc = Util.getAvatar(target, true) // + "\n" + */("+").repeat(numSep);

        Util.sendEmbed(channel, 'User Info', null, Util.makeEmbedFooter(speaker), Util.getAvatar(target), 0x00E676, sendEmbedFields);

        return undefined;
    },
});
