import React from 'react'
import PropTypes from 'prop-types'
const PinSVG = ({ active }) => {
  const color = active ? 'orangered' : 'black'
  return (
    <svg
      style={{ position: 'relative', top: 1 }}
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 365.000000 365.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        transform='translate(0.000000,356.000000) scale(0.100000,-0.100000)'
        fill={color}
        stroke='none'
      >
        <path
          d='M2414 3456 c-41 -18 -83 -74 -91 -120 -4 -23 1 -53 12 -82 9 -25 13
-49 9 -53 -5 -5 -160 -98 -344 -208 l-335 -200 -85 -12 c-165 -24 -350 -99
-484 -195 -92 -66 -181 -151 -200 -190 -18 -39 -21 -107 -5 -139 6 -12 108
-119 226 -238 l215 -216 -612 -774 c-336 -426 -615 -783 -619 -794 -17 -41 18
-83 58 -70 10 3 369 282 797 620 l779 615 215 -214 c118 -118 226 -219 238
-226 33 -16 104 -15 140 4 45 23 171 165 230 259 84 134 145 303 167 462 6 40
45 114 207 390 111 187 202 342 204 344 3 3 20 -3 39 -12 75 -36 152 -12 202
62 25 37 30 100 12 148 -13 35 -758 785 -818 824 -50 32 -105 37 -157 15z
m489 -494 c218 -219 397 -402 397 -408 0 -5 -7 -20 -16 -32 -37 -53 -43 -48
-462 371 -402 403 -416 419 -380 455 36 36 52 24 461 -386z m120 -523 c-21
-36 -68 -94 -106 -129 -63 -58 -68 -67 -63 -94 4 -17 7 -35 7 -41 1 -5 -51
-98 -115 -206 -113 -190 -117 -199 -131 -286 -27 -165 -73 -286 -161 -421 -64
-97 -171 -212 -199 -212 -22 0 -1260 1231 -1268 1260 -2 9 1 26 7 38 14 25
119 119 181 162 114 79 302 152 424 166 l63 7 263 -263 c218 -218 267 -262
291 -262 30 0 54 24 54 56 0 13 -88 109 -247 268 -136 136 -245 249 -242 252
2 2 78 48 169 103 113 67 172 97 189 95 17 -3 36 9 71 43 26 25 87 71 136 100
l89 54 313 -313 313 -312 -38 -65z m-1488 -839 l120 -120 -25 -24 c-26 -25
-1104 -876 -1129 -891 -18 -11 -24 -18 478 618 233 295 427 537 430 537 4 0
60 -54 126 -120z'
        />
        <path
          d='M2332 2867 c-54 -55 -64 -84 -36 -111 28 -28 57 -18 112 37 53 53 60
73 42 108 -20 36 -61 24 -118 -34z'
        />
        <path
          d='M2522 2677 c-54 -55 -64 -84 -36 -111 28 -28 57 -18 112 37 53 53 60
73 42 108 -20 36 -61 24 -118 -34z'
        />
        <path
          d='M2712 2487 c-54 -55 -64 -84 -36 -111 28 -28 57 -18 112 37 53 53 60
73 42 108 -20 36 -61 24 -118 -34z'
        />
        <path
          d='M2336 2097 c-39 -28 -24 -64 65 -153 46 -47 94 -87 106 -90 35 -9 63
12 63 48 0 27 -15 46 -88 120 -89 89 -111 100 -146 75z'
        />
      </g>
    </svg>
  )
}

PinSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default PinSVG
