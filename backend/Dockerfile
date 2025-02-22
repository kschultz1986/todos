FROM rust:1.81.0 AS build
RUN USER=root cargo new --bin backend
WORKDIR /app
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
COPY ./src ./src
COPY ./.sqlx ./.sqlx
ENV SQLX_OFFLINE true
RUN cargo build --release

FROM rust:1.81.0 AS runtime
WORKDIR /app
COPY --from=build /app/target/release/backend ./
COPY ./migrations ./migrations
COPY ./entrypoint.sh ./
RUN cargo install sqlx-cli --no-default-features --features native-tls,postgres
ENV DATABASE_URL postgres://postgres:password@postgres:5432/todos
RUN chmod +x entrypoint.sh
EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["./backend"]
