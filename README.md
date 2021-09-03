# Burning-Heart(Auto Repeat)
忍者(普通攻击) - 无查克拉消耗即可释放
忍者觉醒-多重分身火焰術(默认自动循环)

---

- 直接更改数据包'C_START_SKILL'中对应的技能ID, 造成的此bug, 已在 Live-109.02 TW(384752) 得到修复

- 不同于: 阻止数据包'C_START_SKILL'中对应的技能ID, 并伪造'C_START_INSTANCE_SKILL'相应ID的模式, 且

  [Replacer-Skill](https://github.com/tera-mod/Replacer-Skill) 替换方式, 也已在 Live-105.02 TW(第二次更新)中得到修复

---

这次修正的方式依旧和上次(C_START_INSTANCE_SKILL)相同, 在'C_START_SKILL'数据包的头部, 增加了此数据的"使用计数"之类的一些新定义项,

那么 [tera-data-parser](https://github.com/tera-toolbox/tera-data-parser-js) 对数据类型 SkillID 的加解密就将不再准确了

而公共版的 [skill-prediction](https://github.com/tera-mods/skill-prediction) 自然也是会发送这一类的数据给服务器端的, 能否继续安全使用下去, 有待测试...
