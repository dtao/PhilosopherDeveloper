Imports System.Threading

Public Class DeadlockExampleForm

    Private _lock As New Object
    Private _unlocked As New ManualResetEvent(False)

    Private Sub BigButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles BigButton.Click
        SyncLock _lock
            Dim t As New Thread(AddressOf Deadlock)
            t.Start()

            MsgBox("Once you click 'OK' I will enter deadlock.", MsgBoxStyle.OkOnly, "Deadlock Incoming...")

            ' This line will wait forever.
            _unlocked.WaitOne()
        End SyncLock
    End Sub

    Private Sub Deadlock()
        SyncLock _lock
            ' Invoke is a blocking call. This thread will not continue past this
            ' line until the lock on the UI thread is released. But since the
            ' UI thread will not leave the button's Click event handler until
            ' _unlocked is signalled below, this will never happen.
            Invoke(New Action(AddressOf NotifyComplete))

            ' This line will never be reached.
            _unlocked.Set()
        End SyncLock
    End Sub

    Private Sub NotifyComplete()
        MsgBox("I escaped deadlock!", MsgBoxStyle.OkOnly, "No Deadlock?")
    End Sub

End Class
