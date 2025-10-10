// Intercepts the response from all methods in a @Controller() annotated class
function wrapWithInterceptor(
	_target: any,
	_key: string,
	descriptor: PropertyDescriptor,
	formatResponse: (res: any) => any,
) {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {
		const result = await originalMethod.apply(this, args);
		return formatResponse(result);
	};

	return descriptor;
}

export function ClassResponseInterceptor(intercept: (res: any) => any) {
	return (target: Function) => {
		const methodNames = Object.getOwnPropertyNames(target.prototype).filter(
			(method) => method !== "constructor" && typeof target.prototype[method] === "function",
		);

		for (const methodName of methodNames) {
			const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);

			if (descriptor) {
				wrapWithInterceptor(target.prototype, methodName, descriptor, intercept);
				Object.defineProperty(target.prototype, methodName, descriptor);
			}
		}
	};
}
