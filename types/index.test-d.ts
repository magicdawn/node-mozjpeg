import {expectType} from 'tsd'
import {encode, encodeAsync, version} from '..'

expectType<string>(version)
