module.exports = Cmds.addCommand({
	cmds: [";unmute ", ";unwarn ", ";unmutehammer "],

	requires: {
		guild: true,
		loud: false
	},

	desc: "Unmute a user",

	args: "([@user] | [id] | [name])",

	example: "vae",

	///////////////////////////////////////////////////////////////////////////////////////////

	func: (cmd, args, msgObj, speaker, channel, guild) => {
		Mutes.unMuteName(args, false, guild, Util.getPosition(speaker), channel, speaker);
	}
});