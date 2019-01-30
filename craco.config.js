const WebpackBar = require('webpackbar');
const CracoAntDesignPlugin = require('craco-antd');
const path = require('path');

module.exports = {
	babel: {
		plugins: [
			['@babel/plugin-proposal-decorators', { legacy: true }] // MobX
		]
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^@assets(.*)$': '<rootDir>/src/assets$1',
				'^@components(.*)$': '<rootDir>/src/components$1',
				'^@containers(.*)$': '<rootDir>/src/containers$1',
				'^@enums(.*)$': '<rootDir>/src/enums$1',
				'^@logger(.*)$': '<rootDir>/src/logger$1',
				'^@models(.*)$': '<rootDir>/src/models$1',
				'^@pages(.*)$': '<rootDir>/src/pages$1',
				'^@router(.*)$': '<rootDir>/src/router$1',
				'^@store(.*)$': '<rootDir>/src/store$1',
				'^@theme(.*)$': '<rootDir>/src/theme$1',
				'^@themes(.*)$': '<rootDir>/src/theme/styles/default$1',
				'^@utils(.*)$': '<rootDir>/src/utils$1'
			}
		}
	},
	plugins: [
		{
			plugin: CracoAntDesignPlugin,
			options: {
				customizeThemeLessPath: path.join(__dirname, 'src/themes/styles/default/index.less')
			}
		}
	],
	webpack: {
		alias: {
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@containers': path.resolve(__dirname, 'src/containers'),
			'@enums': path.resolve(__dirname, 'src/enums'),
			'@logger': path.resolve(__dirname, 'src/logger'),
			'@models': path.resolve(__dirname, 'src/models'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@router': path.resolve(__dirname, 'src/router'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@theme': path.resolve(__dirname, 'src/theme'),
			'@themes': path.resolve(__dirname, `src/theme/styles/default`),
			'@utils': path.resolve(__dirname, 'src/utils/')
		},
		plugins: [
			new WebpackBar({ profile: true }),
			...(process.env.NODE_ENV === 'development' ? [] : [])
		]
	}
};
