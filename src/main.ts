import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'

interface HmrData {
	closePromise?: Promise<void>
}

interface HmrModule {
	hot?: {
		data?: HmrData
		accept(): void
		dispose(callback: (data: HmrData) => void): void
	}
}

declare const module: HmrModule

async function bootstrap() {
	const hot = typeof module === 'undefined' ? undefined : module.hot

	if (hot?.data?.closePromise) {
		await hot.data.closePromise
	}

	const app = await NestFactory.create(AppModule, {
		forceCloseConnections: Boolean(hot)
	})

	await app.listen(process.env.PORT ?? 3000)

	hot?.accept()
	hot?.dispose((data) => {
		data.closePromise = app.close()
	})
}
await bootstrap()
