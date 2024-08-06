'use server'

export async function signup() {
    const supabase = createClient()
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
   
  
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      redirect('/error')
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }