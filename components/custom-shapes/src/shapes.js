export const SHAPE_OPTIONS = [
	{ label: 'Onda Suave (Wave Smooth)', value: 'wave-smooth' },
	{ label: 'Ondas em Camadas (Wave Layered)', value: 'wave-layered' },
	{ label: 'Corte Inclinado Direita (Tilt Right)', value: 'tilt-right' },
	{ label: 'Corte Inclinado Esquerda (Tilt Left)', value: 'tilt-left' },
	{ label: 'Triângulo Central (Triangle Center)', value: 'triangle-center' },
	{ label: 'Curva Côncava (Curve Concave)', value: 'curve-concave' },
	{ label: 'Curva Convexa (Curve Convex)', value: 'curve-convex' },
	{ label: 'Zigue-Zague (ZigZag)', value: 'zigzag' },
];

export function renderSvgShape( shapeType, color = '#ffffff' ) {
	switch ( shapeType ) {
		case 'wave-layered':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path
						d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
						fill={ color }
						opacity="0.5"
					/>
					<path
						d="M0,0 C200,70 420,-10 600,40 C800,90 1000,20 1200,70 L1200,120 L0,120 Z"
						fill={ color }
					/>
				</svg>
			);
		case 'tilt-right':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path d="M1200 0L0 120 1200 120 1200 0z" fill={ color } />
				</svg>
			);
		case 'tilt-left':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path d="M0 0L1200 120 0 120 0 0z" fill={ color } />
				</svg>
			);
		case 'triangle-center':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path d="M0 0L600 120 1200 0 1200 120 0 120z" fill={ color } />
				</svg>
			);
		case 'curve-concave':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path
						d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
						fill={ color }
					/>
				</svg>
			);
		case 'curve-convex':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path
						d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"
						fill={ color }
					/>
				</svg>
			);
		case 'zigzag':
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path
						d="M0,0 L150,100 L300,0 L450,100 L600,0 L750,100 L900,0 L1050,100 L1200,0 L1200,120 L0,120 Z"
						fill={ color }
					/>
				</svg>
			);
		case 'wave-smooth':
		default:
			return (
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="periodic-shape-svg"
				>
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,152.47,131.57,222.06,121.27,256.09,116.23,289.43,101.44,321.39,56.44Z"
						fill={ color }
					/>
				</svg>
			);
	}
}
