import { _HashBuckets } from "./_HashBuckets";

import { MapContainer } from "../container/MapContainer";
import { IHashMap } from "../container/IHashMap";
import { MapIterator } from "../iterator/MapIterator";

/**
 * @hidden
 */
export class _MapHashBuckets<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>>
	extends _HashBuckets<MapIterator<Key, T, Unique, Source>>
{
	private source_: IHashMap<Key, T, Unique, Source>;

	private hash_function_: (key: Key) => number;
	private key_eq_: (x: Key, y: Key) => boolean;

	/* ---------------------------------------------------------
		CONSTRUCTORS & ACCESSORS
	--------------------------------------------------------- */
	public constructor(source: IHashMap<Key, T, Unique, Source>, hash: (key: Key) => number, pred: (x: Key, y: Key) => boolean)
	{
		super();

		this.source_ = source;
		this.hash_function_ = hash;
		this.key_eq_ = pred;
	}

	public hash_function(): (key: Key) => number
	{
		return this.hash_function_;
	}
	public key_eq(): (x: Key, y: Key) => boolean
	{
		return this.key_eq_;
	}
	
	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	public find(key: Key): MapIterator<Key, T, Unique, Source>
	{
		let index = this.hash_function_(key) % this.size();
		let bucket = this.at(index);

		for (let it of bucket)
			if (this.key_eq_(it.first, key))
				return it;

		return this.source_.end();
	}

	public hash_index(it: MapIterator<Key, T, Unique, Source>): number
	{
		return this.hash_function_(it.first) % this.size();
	}
}