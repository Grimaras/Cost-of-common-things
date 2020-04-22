cat ascii.txt
echo "Pulling git for potential changes";
git pull --rebase;
echo "Destroying current terraform ...";
terraform destroy -auto-approve ;
echo "Creating terraform ....";
terraform apply -auto-approve ;
echo "Add modifications";
git add -u;
echo "commit modifications";
git commit -m "terraform : destroy and apply";
echo "push commit";
git push;
echo "Done !";
