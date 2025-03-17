<script>
  import {
    Grid,
    Row,
    Column,
    TextInput,
    PasswordInput,
    Button,
    Link,
    Theme
  } from "carbon-components-svelte";
  import { Login } from "carbon-icons-svelte";
  import "carbon-components-svelte/css/all.css";
	import { goto } from '$app/navigation';

  let email = "";
  let password = "";

  function handleLogin() {
    // TODO: Implement login logic
    console.log("Login attempt:", { email, password });
  }
</script>

<Theme>
  <div class="login-container">
    <Grid>
      <Row>
        <Column sm={4} md={8} lg={16}>
          <div class="login-box">
            <div class="login-header">
              <h1>Welcome Back</h1>
              <p>Please login to continue</p>
            </div>

            <form on:submit|preventDefault={handleLogin}>
              <TextInput
                labelText="Email"
                placeholder="Enter your email"
                bind:value={email}
                required
              />

              <PasswordInput
                labelText="Password"
                placeholder="Enter your password"
                bind:value={password}
                required
              />

              <div class="form-footer">
                <Link href="/forgot-password">Forgot password?</Link>
                <Button type="submit" icon={Login} on:click={() => {goto("/")}}>Login</Button>
              </div>
            </form>
          </div>
        </Column>
      </Row>
    </Grid>
  </div>
</Theme>

<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--cds-layer-01);
  }

  .login-box {
    background: var(--cds-layer-02);
    padding: 2rem;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-header h1 {
    margin: 0;
    color: var(--cds-text-01);
  }

  .login-header p {
    margin: 0.5rem 0 0;
    color: var(--cds-text-02);
  }

  form :global(.bx--form-item) {
    margin-bottom: 1.5rem;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }
</style>