/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		PUBLIC_URL: string;
	}
}

declare module '*.css' {
	const styles: any;
	export = styles;
}

declare module '*.scss' {
	const styles: any;
	export = styles;
}

declare module '*.less' {
	const styles: any;
	export = styles;
}
