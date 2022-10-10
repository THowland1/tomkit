const X_KEY = '%x';
const Y_KEY = '%y';

type ImageTile = { el: HTMLImageElement; column: number; row: number };

const buildNoop = () => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return () => {};
};

function loadImage(src: string) {
	const img = new Image();
	img.crossOrigin = 'anonymous';
	let resolvePromise: (image: HTMLImageElement) => void = buildNoop();
	let rejectPromise: (e: string | Event) => void = buildNoop();
	const promise = new Promise<HTMLImageElement>((resolve, reject) => {
		resolvePromise = resolve;
		rejectPromise = reject;
	});
	img.onload = () => resolvePromise(img);
	img.onerror = (e) => rejectPromise(e);
	img.src = src;

	return promise;
}

export class TileScraper {
	constructor(public url: string) {
		const allKeys = [X_KEY, Y_KEY];
		const hasAllKeys = allKeys.every((key) => url.includes(key));
		if (!hasAllKeys) {
			throw new Error(`URL must have "${allKeys.join('", "')}" `);
		}
	}

	buildURL(x: number, y: number) {
		return this.url.replace(X_KEY, String(x)).replace(Y_KEY, String(y));
	}
	async loadTiles(xMin: number, xMax: number, yMin: number, yMax: number) {
		const imageTiles: ImageTile[] = [];

		for (let x = xMin; x <= xMax; x++) {
			for (let y = yMin; y <= yMax; y++) {
				const el = await loadImage(this.buildURL(x, y));
				imageTiles.push({
					el,
					column: x,
					row: y
				});
			}
		}
	}

	async fetchColumnImages(column: number): Promise<ImageTile[]> {
		let maxFound = false;
		let row = 0;
		const imageTiles: ImageTile[] = [];
		do {
			try {
				const el = await loadImage(this.buildURL(column, row));
				imageTiles.push({
					el,
					column,
					row
				});
				row++;
			} catch (error) {
				maxFound = true;
			}
		} while (!maxFound);
		return imageTiles;
	}
	async fetchRowImages(row: number): Promise<ImageTile[]> {
		let maxFound = false;
		let column = 0;
		const imageTiles: ImageTile[] = [];
		do {
			try {
				const el = await loadImage(this.buildURL(column, row));
				imageTiles.push({
					el,
					column,
					row
				});
				column++;
			} catch (error) {
				maxFound = true;
			}
		} while (!maxFound);
		return imageTiles;
	}
	async fetchGridImages(
		minrow: number,
		maxrow: number,
		mincolumn: number,
		maxcolumn: number
	): Promise<ImageTile[]> {
		const imageTiles: ImageTile[] = [];
		for (let row = minrow; row <= maxrow; row++) {
			for (let column = mincolumn; column <= maxcolumn; column++) {
				try {
					const el = await loadImage(this.buildURL(column, row));
					if (el) {
						imageTiles.push({ el, row, column });
					}
					// eslint-disable-next-line no-empty
				} catch {}
			}
		}
		return imageTiles;
	}

	getImageTileBounds(imageTiles: ImageTile[]) {
		const columnvalues = imageTiles.map((o) => o.column);
		const rowvalues = imageTiles.map((o) => o.row);
		const mincolumn = Math.min(...columnvalues);
		const maxcolumn = Math.max(...columnvalues);
		const minrow = Math.min(...rowvalues);
		const maxrow = Math.max(...rowvalues);
		return {
			mincolumn,
			maxcolumn,
			minrow,
			maxrow
		};
	}

	async drawOnCanvas(ctx: CanvasRenderingContext2D, imageTiles: ImageTile[]) {
		if (imageTiles.length < 1) {
			throw new Error('Must have at least one image tile');
		}
		const { mincolumn, maxcolumn, minrow, maxrow } = this.getImageTileBounds(imageTiles);

		const tileWidth = imageTiles[0].el.width;
		const tileHeight = imageTiles[0].el.height;
		for (let row = minrow; row <= maxrow; row++) {
			for (let column = mincolumn; column <= maxcolumn; column++) {
				const tile = imageTiles.find((t) => t.row === row && t.column === column);
				if (tile) {
					ctx.drawImage(tile.el, column * tileWidth, row * tileHeight);
				}
			}
		}
	}

	async build(canvas: HTMLCanvasElement) {
		const ctx = canvas?.getContext('2d');
		if (!ctx) {
			throw new Error("Couldn't find canvas context");
		}

		const images: ImageTile[] = [];

		// Fetch first row and column
		const [firstColumn, firstRow] = await Promise.all([
			this.fetchColumnImages(0),
			this.fetchRowImages(0)
		]);
		images.push(...firstColumn, ...firstRow);

		// Fetch rest of grid
		const { mincolumn, maxcolumn, minrow, maxrow } = this.getImageTileBounds(images);
		const restOfGridImages = await this.fetchGridImages(
			minrow + 1,
			maxrow,
			mincolumn + 1,
			maxcolumn
		);
		images.push(...restOfGridImages);

		// Calculate dimensions
		const toplefttile = images.find((tile) => tile.column === 0 && tile.row === 0);
		const bottomrighttile = images.find((tile) => tile.column === maxcolumn && tile.row === maxrow);
		assertIsDefined(toplefttile, "Couldn't find toplefttile");
		assertIsDefined(bottomrighttile, "Couldn't find bottomrighttile");

		const width = toplefttile.el.width * maxcolumn + bottomrighttile.el.width;
		const height = toplefttile.el.height * maxrow + bottomrighttile.el.height;

		// Draw
		canvas.height = height;
		canvas.width = width;
		ctx.clearRect(0, 0, width, height);
		this.drawOnCanvas(ctx, images);
	}
}

function assertIsDefined<T>(value: T, message: string): asserts value is NonNullable<T> {
	if (value === undefined || value === null) {
		alert(message);
		throw new Error(message);
	}
}
