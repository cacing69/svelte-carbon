<script lang="ts">
  import { LoginSchema, type LoginDto, type LoginResponse } from '../../services/dummy-json/dtos/login.dto';
  import {
    Grid,
    Row,
    Column,
    TextInput,
    PasswordInput,
    Button,
    Link,
    Theme,
    InlineNotification
  } from "carbon-components-svelte";
  import { Login } from "carbon-icons-svelte";
  import "carbon-components-svelte/css/all.css";
import { createMutation } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import { notify } from '../../utils/notification.util';
	import { login } from '../../services/dummy-json/auth.service';


  let username = 'emilys';
  let password = 'emilyspass';

  const loginMutate = createMutation<LoginResponse, Error, LoginDto>({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      LoginSchema.parse(credentials);
      return await login(credentials);
    },
    onSuccess: (data) => {
      notify.info('Login success')
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      goto('/');
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    }
  });

  function handleLogin() {
    $loginMutate.reset();
    $loginMutate.mutate({
      username,
      password
    });
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

              {#if $loginMutate.isError}
                <InlineNotification
                lowContrast
                  kind="error"
                  title="Login Failed"
                  subtitle={$loginMutate.error.message}
                  hideCloseButton
                />
              {/if}

              <form on:submit|preventDefault={handleLogin}>
                <TextInput
                  labelText="Username"
                  placeholder="Enter your username"
                  bind:value={username}
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
                  <Button
                    type="submit"
                    icon={Login}
                    disabled={$loginMutate.isPending}
                  >
                    Login
                  </Button>
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