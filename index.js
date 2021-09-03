const Replace_Job   = 11     // 忍者[Ninja]
const Replace_Group = 1      // 連續攻擊[Combo Attack]
const Replace_Skill = 150731 // 多重分身火焰術[Harmonious Burning Heart] 150731 / 150732

let Enabled     = true // 模组开关
let Auto_Repeat = true // 自动循环

module.exports = function BurningHeart(mod) {
	let hooks = [], repeat = false, packet = null
	
	mod.command.add("喷火", () => {
		Enabled = !Enabled
		mod.command.message(Enabled)
		Enabled ? Load() : Unload()
	})
	mod.command.add("连喷", () => {
		Auto_Repeat = !Auto_Repeat
		mod.command.message(Auto_Repeat)
	})
	mod.game.initialize('me')
	mod.game.on('enter_game', () => {
		if ((mod.game.me.templateId-10101)%100 != Replace_Job) return
		if (mod.manager.isLoaded('skill-prediction')) mod.manager.unload('skill-prediction')
		if (Enabled) Load()
	})
	mod.game.on('leave_game', Unload)
	
	function Load() {
		if (!hooks.length) {
			hook('C_START_SKILL', 7, (event) => {
				if (Math.floor(event.skill.id/10000)!=Replace_Group) return
				event.skill.id = Replace_Skill
				packet = event
				if (Auto_Repeat) repeat = true
				return true
			})
			hook('S_ACTION_STAGE', 9, (event) => {
				if (!mod.game.me.is(event.gameId) || !repeat) return
				if (event.skill.id != Replace_Skill) repeat = false
			})
			hook('S_ACTION_END', 5, (event) => {
				if (!mod.game.me.is(event.gameId) || !repeat) return
				mod.send('C_START_SKILL', 7, packet)
			})
		}
	}
	function hook() {
		hooks.push(mod.hook(...arguments))
	}
	function Unload() {
		if (!hooks.length) return
		for (let h of hooks) mod.unhook(h)
		hooks = []
	}
}
