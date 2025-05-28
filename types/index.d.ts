export const version: string

export enum ColorSpace {
  GRAYSCALE = 1,
  RGB,
  YCbCr,
}

export interface EncodeOptions {
  quality: number
  baseline: boolean
  arithmetic: boolean
  progressive: boolean
  optimize_coding: boolean
  smoothing: number
  color_space: ColorSpace
  quant_table: number
  trellis_multipass: boolean
  trellis_opt_zero: boolean
  trellis_opt_table: boolean
  trellis_loops: number
  auto_subsample: boolean
  chroma_subsample: number
  separate_chroma_quality: boolean
  chroma_quality: number
}

export function encodeSync(input: Buffer, width: number, height: number, options?: Partial<EncodeOptions>): Buffer

export function encode(input: Buffer, width: number, height: number, options?: Partial<EncodeOptions>): Promise<Buffer>
