import { aggregates } from "aleph-js"

const QUARTZ_MULTIPLIER = 100000

export function get_serialized_id(archetype_id, item_id) {
    return (Number(archetype_id)*QUARTZ_MULTIPLIER) + Number(item_id)
}

export function get_archetype_id(serialized_id) {
    return Math.floor(serialized_id/QUARTZ_MULTIPLIER)
}

export function get_item_id(serialized_id) {
    return serialized_id % QUARTZ_MULTIPLIER
}

export async function get_profile_name(publisher_address, address) {
    try {
        let value = await aggregates.fetch_one(
            publisher_address,
            `profile:${address}`
        )
        if (value.profileName !== null) {
            return value.profileName
        } else {
            return address
        }
    } catch {
        return address
    }
}