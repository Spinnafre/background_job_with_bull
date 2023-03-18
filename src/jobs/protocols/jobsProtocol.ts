interface IJobs<D, R> {
  handler(data: D): Promise<R>;
}

export { IJobs };
