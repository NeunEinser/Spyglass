import * as core from '@spyglassmc/core'
import type { BrigadierBoolArgumentNode, BrigadierDoubleArgumentNode, BrigadierFloatArgumentNode, BrigadierIntegerArgumentNode, BrigadierLongArgumentNode, BrigadierStringArgumentNode, MinecraftColorArgumentNode, MinecraftDimensionArgumentNode, MinecraftEntityAnchorArgumentNode, MinecraftEntitySummonArgumentNode, MinecraftFunctionArgumentNode, MinecraftItemEnchantmentArgumentNode, MinecraftMobEffectArgumentNode, MinecraftObjectiveArgumentNode, MinecraftOperationArgumentNode, MinecraftResourceLocationArgumentNode, MinecraftScoreboardSlotArgumentNode, MinecraftSwizzleArgumentNode, SpyglassmcSymbolArgumentNode, SpyglassmcTagArgumentNode } from '../node'

export function register(meta: core.MetaRegistry) {
	meta.registerColorizer<BrigadierBoolArgumentNode>('mcfunction:argument/brigadier:bool', core.colorizer.boolean)
	meta.registerColorizer<BrigadierDoubleArgumentNode>('mcfunction:argument/brigadier:double', core.colorizer.number)
	meta.registerColorizer<BrigadierFloatArgumentNode>('mcfunction:argument/brigadier:float', core.colorizer.number)
	meta.registerColorizer<BrigadierIntegerArgumentNode>('mcfunction:argument/brigadier:integer', core.colorizer.number)
	meta.registerColorizer<BrigadierLongArgumentNode>('mcfunction:argument/brigadier:long', core.colorizer.number)
	meta.registerColorizer<BrigadierStringArgumentNode>('mcfunction:argument/brigadier:string', core.colorizer.string)
	// meta.registerColorizer<MinecraftAngleArgumentNode>('mcfunction:argument/minecraft:angle',)
	// meta.registerColorizer<MinecraftBlockPosArgumentNode>('mcfunction:argument/minecraft:block_pos',)
	// meta.registerColorizer<MinecraftBlockPredicateArgumentNode>('mcfunction:argument/minecraft:block_predicate',)
	// meta.registerColorizer<MinecraftBlockStateArgumentNode>('mcfunction:argument/minecraft:block_state',)
	meta.registerColorizer<MinecraftColorArgumentNode>('mcfunction:argument/minecraft:color', core.colorizer.literal)
	// meta.registerColorizer<MinecraftColumnPosArgumentNode>('mcfunction:argument/minecraft:column_pos',)
	// meta.registerColorizer<MinecraftComponentArgumentNode>('mcfunction:argument/minecraft:component',)
	meta.registerColorizer<MinecraftDimensionArgumentNode>('mcfunction:argument/minecraft:dimension', core.colorizer.resourceLocation)
	// meta.registerColorizer<MinecraftEntityArgumentNode>('mcfunction:argument/minecraft:entity',)
	meta.registerColorizer<MinecraftEntityAnchorArgumentNode>('mcfunction:argument/minecraft:entity_anchor', core.colorizer.literal)
	meta.registerColorizer<MinecraftEntitySummonArgumentNode>('mcfunction:argument/minecraft:entity_summon', core.colorizer.resourceLocation)
	// meta.registerColorizer<MinecraftFloatRangeArgumentNode>('mcfunction:argument/minecraft:float_range',)
	meta.registerColorizer<MinecraftFunctionArgumentNode>('mcfunction:argument/minecraft:function', core.colorizer.resourceLocation)
	// meta.registerColorizer<MinecraftGameProfileArgumentNode>('mcfunction:argument/minecraft:game_profile',)
	// meta.registerColorizer<MinecraftIntRangeArgumentNode>('mcfunction:argument/minecraft:int_range',)
	meta.registerColorizer<MinecraftItemEnchantmentArgumentNode>('mcfunction:argument/minecraft:item_enchantment', core.colorizer.resourceLocation)
	// meta.registerColorizer<MinecraftItemPredicateArgumentNode>('mcfunction:argument/minecraft:item_predicate',)
	// meta.registerColorizer<MinecraftItemSlotArgumentNode>('mcfunction:argument/minecraft:item_slot',)
	// meta.registerColorizer<MinecraftItemStackArgumentNode>('mcfunction:argument/minecraft:item_stack',)
	// meta.registerColorizer<MinecraftMessageArgumentNode>('mcfunction:argument/minecraft:message',)
	meta.registerColorizer<MinecraftMobEffectArgumentNode>('mcfunction:argument/minecraft:mob_effect', core.colorizer.resourceLocation)
	// meta.registerColorizer<MinecraftNbtCompoundTagArgumentNode>('mcfunction:argument/minecraft:nbt_compound_tag',)
	// meta.registerColorizer<MinecraftNbtPathArgumentNode>('mcfunction:argument/minecraft:nbt_path',)
	// meta.registerColorizer<MinecraftNbtTagArgumentNode>('mcfunction:argument/minecraft:nbt_tag',)
	meta.registerColorizer<MinecraftObjectiveArgumentNode>('mcfunction:argument/minecraft:objective', core.colorizer.symbol)
	// meta.registerColorizer<MinecraftObjectiveCriteriaArgumentNode>('mcfunction:argument/minecraft:objective_criteria',)
	meta.registerColorizer<MinecraftOperationArgumentNode>('mcfunction:argument/minecraft:operation', core.colorizer.literal)
	// meta.registerColorizer<MinecraftParticleArgumentNode>('mcfunction:argument/minecraft:particle',)
	meta.registerColorizer<MinecraftResourceLocationArgumentNode>('mcfunction:argument/minecraft:resource_location', core.colorizer.resourceLocation)
	// meta.registerColorizer<MinecraftRotationArgumentNode>('mcfunction:argument/minecraft:rotation',)
	// meta.registerColorizer<MinecraftScoreHolderArgumentNode>('mcfunction:argument/minecraft:score_holder',)
	meta.registerColorizer<MinecraftScoreboardSlotArgumentNode>('mcfunction:argument/minecraft:scoreboard_slot', core.colorizer.literal)
	meta.registerColorizer<MinecraftSwizzleArgumentNode>('mcfunction:argument/minecraft:swizzle', core.colorizer.literal)
	// meta.registerColorizer<MinecraftTeamArgumentNode>('mcfunction:argument/minecraft:team',)
	// meta.registerColorizer<MinecraftTimeArgumentNode>('mcfunction:argument/minecraft:time',)
	// meta.registerColorizer<MinecraftUuidArgumentNode>('mcfunction:argument/minecraft:uuid',)
	// meta.registerColorizer<MinecraftVec2ArgumentNode>('mcfunction:argument/minecraft:vec2',)
	// meta.registerColorizer<MinecraftVec3ArgumentNode>('mcfunction:argument/minecraft:vec3',)
	meta.registerColorizer<SpyglassmcTagArgumentNode>('mcfunction:argument/spyglassmc:tag', core.colorizer.symbol)
	meta.registerColorizer<SpyglassmcSymbolArgumentNode>('mcfunction:argument/spyglassmc:symbol', core.colorizer.symbol)
}
