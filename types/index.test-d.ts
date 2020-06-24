import {expectType} from 'tsd'
import {encodeSync, encode, version} from '..'

expectType<string>(version)
