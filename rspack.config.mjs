import { defineConfig } from '@rspack/cli'
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
	mode: isProduction ? 'production' : 'development',

	context: rootDir,

	// Compile ứng dụng cho Node.js
	target: 'node',

	// Production: không nhúng HMR runtime
	// Development: bật polling HMR
	entry: {
		main: isProduction ? './src/main.ts' : ['@rspack/core/hot/poll?100', './src/main.ts']
	},

	output: {
		path: resolve(rootDir, 'dist'),
		filename: '[name].cjs',
		clean: true
	},

	resolve: {
		extensions: ['...', '.ts', '.tsx'],
		extensionAlias: {
			'.js': ['.ts', '.js']
		}
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,

				use: {
					loader: 'builtin:swc-loader',

					options: {
						detectSyntax: 'auto',

						jsc: {
							target: 'es2022',

							parser: {
								decorators: true
							},

							transform: {
								legacyDecorator: true,
								decoratorMetadata: true
							}
						}
					}
				}
			}
		]
	},

	// Các thư viện runtime sẽ được Node.js load
	// trực tiếp thay vì bundle toàn bộ.
	externals: [
		nodeExternals({
			allowlist: [/@rspack\/core\/hot\/poll/]
		})
	],

	// Tắt minification để bảo toàn decorator metadata,
	// tên class và dễ debug ở giai đoạn đầu.
	optimization: {
		minimize: false
	},

	devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',

	// Tự chạy dist/main.js sau lần build đầu tiên
	plugins: isProduction
		? []
		: [
				new RunScriptWebpackPlugin({
					name: 'main.cjs',

					// Không restart process mỗi lần save.
					// Để HMR runtime xử lý cập nhật.
					autoRestart: false
				})
			],

	devServer: {
		hot: true,

		devMiddleware: {
			// Bắt buộc để Node.js đọc được bundle
			writeToDisk: true
		}
	}
})
